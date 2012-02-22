/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'cs': {
		daysOfWeek: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
		daysOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
		monthsOfYear: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
		monthsOfYearShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%d.%m.%Y",
		meridiemLetters: ['am', 'pm']
	}
});
