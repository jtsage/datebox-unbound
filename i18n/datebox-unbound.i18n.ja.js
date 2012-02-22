/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'ja': {
		daysOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
		daysOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
		monthsOfYear: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsOfYearShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%Y/%m/%d",
		meridiemLetters: ['am', 'pm']
	}
});
