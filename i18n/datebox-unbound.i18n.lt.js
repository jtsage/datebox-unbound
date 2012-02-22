/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'lt': {
		daysOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"],
		daysOfWeekShort: ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Ss"],
		monthsOfYear: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
		monthsOfYearShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rug", "Rgs", "Spa", "Lap", "Gru"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%Y-%m-%d",
		meridiemLetters: ['am', 'pm']
	}
});
