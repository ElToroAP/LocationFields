/* eslint-disable no-console */
import { LightningElement, api, wire } from "lwc";
import leaflet from "@salesforce/resourceUrl/leaflet";
import { getRecord, updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
// https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.data_wire_service_about
// Locations can be imported using @salesforce/schema/Bear__c.Location__Latitude__s
const fields = ["Bear__c.Location__Latitude__s", "Bear__c.Location__Longitude__s", "Bear__c.Weight__c"];

export default class InteractiveMap extends LightningElement {
	map;
	location;
	weight;
	leafletInitialized = false;
	@api recordId;
	precision = 5;

	@wire(getRecord, { recordId: "$recordId", fields })
	loadBear({ error, data }) {
		if (error) {
			// TODO: handle error
		} else if (data) {
			// Get Bear data
			this.weight = data.fields.Weight__c.value;
			this.location = [data.fields.Location__Latitude__s.value, data.fields.Location__Longitude__s.value];
			this.initializeMap();
		}
	}

	initializeMap() {
		if (this.leafletInitialized) {
			return;
		}
		this.leafletInitialized = true;

		let promises = [];
		promises.push(loadScript(this, leaflet + "/leaflet.js"));
		promises.push(loadStyle(this, leaflet + "/leaflet.css"));
		Promise.all(promises)
			.then(() => {
				// eslint-disable-next-line no-undef
				const leafMap = L; // L is exported from leaflet.js
				const urlTemplate = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
				const options = {
					attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>',
					maxZoom: 18
				};

				// Create map
				const mapid = this.template.querySelector(".mapid");
				this.map = leafMap.map(mapid);
				this.map.setView(this.location, 13);
				leafMap.tileLayer(urlTemplate, options).addTo(this.map);

				// Create marker
				let marker = leafMap.marker(this.location, { draggable: "true" }); //.addTo(this.map);
				this.map.addLayer(marker);
				marker.on("dragend", event => {
					let newLocation = event.target;
					var newCoord = newLocation.getLatLng();
					this.updateCoordinate(newCoord.lat, newCoord.lng);
					newLocation.setLatLng(new leafMap.LatLng(newCoord.lat, newCoord.lng), { draggable: "true" });
				});
			})
			.catch(error => {
				this.dispatchEvent(
					new ShowToastEvent({
						title: "Error loading",
						message: error.message,
						variant: "error"
					})
				);
			});
	}

	async updateCoordinate(lat2, lng2) {
		try {
			const recordInput = {
				fields: {
					Id: this.recordId,
					Location__Latitude__s: this.round(lat2, this.precision),
					Location__Longitude__s: this.round(lng2, this.precision),
					Weight__c: this.weight + 1
				}
			};
			console.log(
				`${lat2}	=>	${lng2}	=>	${recordInput.fields.Location__Latitude__s}	=>	${recordInput.fields.Location__Longitude__s}`
			);
			await updateRecord(recordInput);
			this.showToast("Success", "Bear location updated", "success");
		} catch (error) {
			this.showToast("Error updating record", error.message, "error");
		}
	}

	showToast(title, message, variant) {
		this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
	}

	round(value, precision) {
		let multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}
}
