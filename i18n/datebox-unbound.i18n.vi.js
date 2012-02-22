/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'vi': {
		daysOfWeek: ["Chủ Nhật", "Thứ hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ sáu", "Thứ Bảy"],
		daysOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
		monthsOfYear: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng mười một", "Tháng mười hai"],
		monthsOfYearShort: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng mười một", "Tháng mười hai"],
		timeFormat: '%k:%M',
		dateFormatLong: '%A, %B %-d, %Y',
		dateFormat: "%d/%m/%Y",
		meridiemLetters: ['am', 'pm']
	}
});
