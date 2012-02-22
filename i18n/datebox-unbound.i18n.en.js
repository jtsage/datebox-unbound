/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'en': {
		daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		timeFormat: '%l:%M %p',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%-m/%-d/%Y",
		meridiemLetters: ['am', 'pm']
	}
});
