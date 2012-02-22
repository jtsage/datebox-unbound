/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'ko': {
		daysOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		daysOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
		monthsOfYear: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsOfYearShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%Y-%m-%d",
		meridiemLetters: ['am', 'pm']
	}
});
