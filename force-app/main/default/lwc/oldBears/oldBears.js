import { LightningElement, wire, track } from "lwc";
import getOldBears from "@salesforce/apex/BearController.getOldBears";

export default class OldBears extends LightningElement {
	@track oldBears = [];

	@wire(getOldBears)
	wired_getOldBears({ data, error }) {
		// eslint-disable-next-line no-debugger
		debugger;
		if (data) {
			console.log(data);
			this.oldBears = data;
		} else if (error) {
			console.log(error);
		}
	}
}
