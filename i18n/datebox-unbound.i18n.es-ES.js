/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

jQuery.extend(Date.prototype.dbLang, {
	'es-ES': {
		daysOfWeek: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
		daysOfWeekShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		monthsOfYear: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviemebre", "Diciembre"],
		monthsOfYearShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		timeFormat: '%l:%M %p',
		dateFormatLong: '%A, %-d %B, %Y',
		dateFormat: "%d/%m/%Y",
		meridiemLetters: ['am', 'pm']
	}
});
