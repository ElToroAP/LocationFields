trigger bear on Bear__c (before update) {
	for (Bear__c bear : trigger.new) {
		System.debug('Lat: ' + bear.Location__Latitude__s);
		System.debug('Lng: ' + bear.Location__Longitude__s);
		System.debug('Wgh: ' + bear.Weight__c);
	}
}