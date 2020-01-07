<<<<<<< HEAD
import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
=======
import { LightningElement, track, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";
>>>>>>> refs/heads/Student
export default class BearMap extends LightningElement {
	@track mapMarkers = [];
	@wire(CurrentPageReference) pageRef; // Required by pubsub
	connectedCallback() {
		// subscribe to bearListUpdate event
<<<<<<< HEAD
		registerListener('bearListUpdate', this.handleBearListUpdate, this);
=======
		registerListener("bearListUpdate", this.handleBearListUpdate, this);
>>>>>>> refs/heads/Student
	}
	disconnectedCallback() {
		// unsubscribe from bearListUpdate event
		unregisterAllListeners(this);
	}
	handleBearListUpdate(bears) {
		this.mapMarkers = bears.map(bear => {
			const Latitude = bear.Location__Latitude__s;
			const Longitude = bear.Location__Longitude__s;
			return {
				location: { Latitude, Longitude },
				title: bear.Name,
				description: `Coords: ${Latitude}, ${Longitude}`,
<<<<<<< HEAD
				icon: 'utility:animal_and_nature'
			};
		});
	}
}
=======
				icon: "utility:animal_and_nature"
			};
		});
	}
}
>>>>>>> refs/heads/Student
