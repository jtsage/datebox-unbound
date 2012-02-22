/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'hu': {
		daysOfWeek: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
		daysOfWeekShort: ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
		monthsOfYear: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
		monthsOfYearShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%Y.%m.%d",
		meridiemLetters: ['am', 'pm']
	}
});
