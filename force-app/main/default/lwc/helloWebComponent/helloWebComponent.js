<<<<<<< HEAD
import { LightningElement, track } from 'lwc';
	
export default class HelloWebComponent extends LightningElement {
    @track greeting = 'Trailblazer';
    
    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

    currentDate = new Date().toDateString();
    get capitalizedGreeting() {
	    return `Hello ${this.greeting.toUpperCase()}!`;
    }
}
=======
import { LightningElement, track } from "lwc";
export default class HelloWebComponent extends LightningElement {
	@track greeting = "Trailblazer";
	handleGreetingChange(event) {
		this.greeting = event.target.value;
	}
	currentDate = new Date().toDateString();
	get capitalizedGreeting() {
		return `Hello ${this.greeting.toUpperCase()}!`;
		// return "Hello" + this.greeting.toUpperCase() + "!";
	}
}
>>>>>>> refs/heads/Student