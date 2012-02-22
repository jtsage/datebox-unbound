/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'ar': {
		daysOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
		daysOfWeekShort: ["الأحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
		monthsOfYear: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونية", "يولية", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
		monthsOfYearShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%d/%m/%Y",
		meridiemLetters: ['am', 'pm']
	}
});
