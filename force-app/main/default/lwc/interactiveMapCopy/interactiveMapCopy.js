/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, api, wire, track } from "lwc";
import { getRecord, updateRecord } from "lightning/uiRecordApi";
const fields = ["Bear__c.Location__Latitude__s", "Bear__c.Location__Longitude__s", "Bear__c.Weight__c"];

export default class InteractiveMap extends LightningElement {
	@api recordId;
	@track bear = {};
	precision = 5;

	@wire(getRecord, { recordId: "$recordId", fields })
	loadBear({ error, data }) {
		if (error) {
			alert(JSON.stringify(error));
		} else if (data) {
			this.bear = {
				lat: data.fields.Location__Latitude__s.value,
				long: data.fields.Location__Longitude__s.value,
				weight: data.fields.Weight__c.value
			};
		}
	}

	latChanged(event) {
		this.bear.lat = event.target.value;
	}
	longChanged(event) {
		this.bear.long = event.target.value;
	}
	weightChanged(event) {
		this.bear.weight = event.target.value;
		this.weight = this.bear.weight;
	}

	saveRecord() {
		this.updateCoordinate(this.bear.lat, this.bear.long);
	}

	async updateCoordinate(lat2, lng2) {
		try {
			const recordInput = {
				fields: {
					Id: this.recordId,
					Location__Latitude__s: this.round(lat2, this.precision),
					Location__Longitude__s: this.round(lng2, this.precision),
					Weight__c: isNaN(this.bear.weight) ? 1 : Number(this.bear.weight) + 1
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
		//
	}

	round(value, precision) {
		let multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}
}
