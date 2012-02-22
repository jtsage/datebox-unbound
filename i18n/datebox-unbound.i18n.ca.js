/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'ca': {
		daysOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
		daysOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
		monthsOfYear: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
		monthsOfYearShort: ["Gen", "Feb", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%d/%m/%y",
		meridiemLetters: ['am', 'pm']
	}
});
