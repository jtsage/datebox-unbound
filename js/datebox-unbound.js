/*
 * DateBox-Unbound : an Enhancment to JavaScript's Date() object
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/datebox-unbound
 */

(function($) {
	$.extend(Date.prototype, {
		_dbZPad: function (number) {
			if ( number < 10 ) { return "0" + String(number); }
			else { return String(number); }
		},
		dbGetPOSIX: function (format) {
			var self = this,
				thisLang = self.dbUseLang;
				
			if ( typeof self.dbLang[thisLang] === 'undefined' ) { thisLang = 'default'; }
				
			if ( typeof format === 'undefined' ) { throw new Error("No format specified"); }
				
			format = format.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper) {
				switch ( oper ) {
					case '%': // Literal %
						return '%';
					case 'a': // Short Day
						return self.dbLang[thisLang].daysOfWeekShort[self.getDay()];
					case 'A': // Full Day of week
						return self.dbLang[thisLang].daysOfWeek[self.getDay()];
					case 'b': // Short month
						return self.dbLang[thisLang].monthsOfYearShort[self.getMonth()];
					case 'B': // Full month
						return self.dbLang[thisLang].monthsOfYear[self.getMonth()];
					case 'C': // Century
						return self.getFullYear().toString().substr(0,2);
					case 'd': // Day of month
						return (( pad === '-' ) ? self.getDate() : self._dbZPad(self.getDate()));
					case 'H': // Hour (01..23)
					case 'k':
						return (( pad === '-' ) ? self.getHours() : self._dbZPad(self.getHours()));
					case 'I': // Hour (01..12)
					case 'l':
						return (( pad === '-' ) ? ((self.getHours() === 0 || self.getHours() === 12)?12:((self.getHours()<12)?self.getHours():(self.getHours()-12))) : self._dbZPad(((self.getHours() === 0 || self.getHours() === 12)?12:((self.getHours()<12)?self.getHours():self.getHours()-12))));
					case 'm': // Month
						return (( pad === '-' ) ? self.getMonth()+1 : self._dbZPad(self.getMonth()+1));
					case 'M': // Minutes
						return (( pad === '-' ) ? self.getMinutes() : self._dbZPad(self.getMinutes()));
					case 'p': // AM/PM (ucase)
						return ((self.getHours() < 12)?self.dbLang[thisLang].meridiemLetters[0].toUpperCase():self.dbLang[thisLang].meridiemLetters[1].toUpperCase());
					case 'P': // AM/PM (lcase)
						return ((self.getHours() < 12)?self.dbLang[thisLang].meridiemLetters[0].toLowerCase():self.dbLang[thisLang].meridiemLetters[1].toLowerCase());
					case 's': // Unix Seconds
						return self.dbGetEpoch();
					case 'S': // Seconds
						return (( pad === '-' ) ? self.getSeconds() : self._dbZPad(self.getSeconds()));
					case 'u':
						return (( pad === '-' ) ? self.getDay() + 1 : self._dbZPad(self.getDay()+1));
					case 'w': // Day of week
						return self.getDay();
					case 'y': // Year (2 digit)
						return self.getFullYear().toString().substr(2,2);
					case 'Y': // Year (4 digit)
						return self.getFullYear();
					case 'o': // Ordinals
						return self.dbGetOrdinal();
					case 'V':
						return (( pad === '-' ) ? self.dbGetISOWeek() : self._dbZPad(self.dbGetISOWeek()));
					case 'U':
						return (( pad === '-' ) ? self.dbGetFullWeekSun() : self._dbZPad(self.dbGetFullWeekSun(0)));
					case 'W':
						return (( pad === '-' ) ? self.dbGetFullWeekMon() : self._dbZPad(self.dbGetFullWeekMon(1)));
					case 'j':
						tmp = new Date(self.getFullYear(),0,1);
						tmp = Math.ceil((self - tmp) / 86400000)+1;
						if ( tmp < 10 ) {
							return '00' + tmp;
						} else if ( tmp < 100 ) {
							return '0' + tmp;
						}
						return tmp;
					case 'G':
						if ( self.dbGetWeek(4) === 1 && self.getMonth() > 0 ) {
							return self.getFullYear() + 1;
						} else if ( self.dbGetWeek(4) > 51 && self.getMonth() < 11 ) {
							return self.getFullYear() - 1;
						}
						return self.getFullYear();
					case 'g':
						if ( self.dbGetWeek(4) === 1 && self.getMonth() > 0 ) {
							return parseInt(self.getFullYear().toString().substr(2,2),10) + 1;
						} else if ( self.dbGetWeek(4) > 51 && self.getMonth() < 11 ) {
							return parseInt(self.getFullYear().toString().substr(2,2),10) - 1;
						}
						return self.getFullYear().toString().substr(2,2);
					default:
						return match;
				}
			});
			return format;
		},
		dbGetISO: function () { 
			/* Get the ISO 8601 representation */
			return String(this.getFullYear()) + '-' + String(this._dbZPad(this.getMonth()+1)) + '-' + String(this._dbZPad(this.getDate()));
		},
		dbGetCompare: function() {
			/* Get an easily comparable Integer DATE */
			return parseInt(this.dbGetISO().replace(/-/g,''),10);
		},
		dbGetEpoch: function () {
			/* Epoch of the date */
			return (this.getTime() - this.getMilliseconds()) / 1000;
		},
		dbCopy: function() {
			/* A Simple copy of the date */
			return this.dbCopyModified();
		},
		dbCopyModified: function(adjust, override) {
			/* Get a modified copy of the date.
			 * First array - Offset the new date by #  (position determines date part)
			 * Second array - If non-zero, force the new date by # (position determines date part)
			 */
			if ( typeof adjust === 'undefined' ) { adjust = [0,0,0,0,0,0,0]; }
			if ( typeof override === 'undefined' ) { override = [0,0,0,0,0,0,0]; }
			while ( adjust.length < 7 ) { adjust.push(0); }
			while ( override.length < 7 ) { override.push(0); }
			return new Date(
				((override[0] > 0 ) ? override[0] : this.getFullYear() + adjust[0]),
				((override[1] > 0 ) ? override[1] : this.getMonth() + adjust[1]),
				((override[2] > 0 ) ? override[2] : this.getDate() + adjust[2]),
				((override[3] > 0 ) ? override[3] : this.getHours() + adjust[3]),
				((override[4] > 0 ) ? override[4] : this.getMinutes() + adjust[4]),
				((override[5] > 0 ) ? override[5] : this.getSeconds() + adjust[5]),
				((override[6] > 0 ) ? override[5] : this.getMilliseconds() + adjust[6]));
		},
		dbGetArray: function() {
			/* Get an array of the date */
			return [this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds()];
		},
		dbAdjustFullYear: function (amount) { return this.dbAdjust(0,amount); },
		dbAdjustMonth: function (amount) { return this.dbAdjust(1,amount); },
		dbAdjustDate: function (amount) { return this.dbAdjust(2,amount); },
		dbAdjustHours: function (amount) { return this.dbAdjust(3,amount); },
		dbAdjustMinutes: function (amount) { return this.dbAdjust(4,amount); },
		dbAdjustSeconds: function (amount) { return this.dbAdjust(5,amount); },
		dbAdjustMilliseconds: function (amount) { return this.dbAdjust(6,amount); },
		dbAdjust: function (type, amount) {
			/* Adjust the date.  Yes, this is chainable */
			if ( typeof amount !== 'number' ) {
				throw new Error("Adjustment value not specified");
			}
			if ( typeof type !== 'number' ) {
				throw new Error("Adjustment type not specified");
			}
			switch ( type ) {
				case 0: this.setFullYear(this.getFullYear() + amount); break;
				case 1: this.setMonth(this.getMonth() + amount); break;
				case 2: this.setDate(this.getDate() + amount); break;
				case 3: this.setHours(this.getHours() + amount); break;
				case 4: this.setMinutes(this.getMinutes() + amount); break;
				case 5: this.setSeconds(this.getSeconds() + amount); break;
				case 6: this.setMilliseconds(this.getMilliseconds() + amount); break;
			}
			return this;
		},
		dbSetFullYear: function (amount) { return this.dbSet(0,amount); },
		dbSetMonth: function (amount) { return this.dbSet(1,amount); },
		dbSetDate: function (amount) { return this.dbSet(2,amount); },
		dbSetHours: function (amount) { return this.dbSet(3,amount); },
		dbSetMinutes: function (amount) { return this.dbSet(4,amount); },
		dbSetSeconds: function (amount) { return this.dbSet(5,amount); },
		dbSetMilliseconds: function (amount) { return this.dbSet(6,amount); },
		dbSet: function(type, amount) {
			/* A chainable version of setWhatever() */
			switch ( type ) {
				case 0: this.setFullYear(amount); break;
				case 1: this.setMonth(amount); break;
				case 2: this.setDate(amount); break;
				case 3: this.setHours(amount); break;
				case 4: this.setMinutes(amount); break;
				case 5: this.setSeconds(amount); break;
				case 6: this.setMilliseconds(amount); break;
			}
			return this;
		},
		dbGetFirstDay: function(overrideMonth, overrideYear) {
			/* Get the first date of this or any month - do not alter the date */
			if ( typeof overrideMonth === 'undefined' ) { overrideMonth = 0; }
			if ( typeof overrideYear === 'undefined' ) { overrideYear = 0; }
			return this.dbCopyModified([0],[overrideYear,overrideMonth,1]).getDay();
		},
		dbGetLastDate: function(overrideMonth, overrideYear) {
			// Get the last DATE of the month (28,29,30,31)
			if ( typeof overrideMonth === 'undefined' ) { overrideMonth = 0; }
			if ( typeof overrideYear === 'undefined' ) { overrideYear = 0; }
			return 32 - this.dbCopyModified([0],[overrideYear,overrideMonth,32,13]).getDate();
		},
		dbGetTimeFormat: function () {
			return this.dbGetPOSIX(this.dbLang[this.dbUseLang].timeFormat);
		},
		dbGetDateFormat: function () {
			return this.dbGetPOSIX(this.dbLang[this.dbUseLang].dateFormat);
		},
		dbGetDateFormatLong: function () {
			return this.dbGetPOSIX(this.dbLang[this.dbUseLang].dateFormatLong);
		},
		dbGetDaysOfWeek: function () {
			if ( typeof this.dbLang[this.dbUseLang].daysOfWeek === 'undefined' ) {
				return this.dbLang['default'].daysOfWeek;
			} else {
				return this.dbLang[this.dbUseLang].daysOfWeek;
			}
		},
		dbGetDaysOfWeekShort: function () {
			if ( typeof this.dbLang[this.dbUseLang].daysOfWeekShort === 'undefined' ) {
				return this.dbLang['default'].daysOfWeekShort;
			} else {
				return this.dbLang[this.dbUseLang].daysOfWeekShort;
			}
		},
		dbGetMonthsOfYear: function () {
			if ( typeof this.dbLang[this.dbUseLang].monthsOfYear === 'undefined' ) {
				return this.dbLang['default'].monthsOfYear;
			} else {
				return this.dbLang[this.dbUseLang].monthsOfYear;
			}
		},
		dbGetMonthsOfYearShort: function () {
			if ( typeof this.dbLang[this.dbUseLang].monthsOfYearShort === 'undefined' ) {
				return this.dbLang['default'].monthsOfYearShort;
			} else {
				return this.dbLang[this.dbUseLang].monthsOfYearShort;
			}
		},
		dbGetCalendar: function (showDays, showOtherMonth, startDayShow) {
			if ( typeof showDays === 'undefined' ) { showDays = true; }
			if ( typeof showOtherMonth === 'undefined' ) { showOtherMonth = true; }
			if ( typeof startDayShow === 'undefined' ) { startDayShow = 0; }
			
			var self = this, rowCount = 0, colCount = 0, thisDay = 1, 
				nextMonth = 1, cal = [], thisRow = [], stop = false,
				startDay = self.dbGetFirstDay(),
				prevLastDate = self.dbCopyModified([0,-1],[0,0,1]).dbGetLastDate(),
				lastDate = self.dbGetLastDate(),
				daysOfWeek = self.dbGetDaysOfWeekShort().concat(self.dbGetDaysOfWeekShort());
				
			if ( startDayShow !== false ) {
				startDay = startDay - startDayShow;
				if ( startDay < 0 ) { startDay = startDay + 7; }
			} 
			if ( showDays === true ) {
				for ( rowCount = 0; rowCount <= 6; rowCount++ ) {
					thisRow.push(daysOfWeek[(rowCount+startDayShow)%7]);
				}
				cal.push(thisRow);
			}
			for ( rowCount = 0; rowCount <= 5; rowCount++ ) {
				if ( stop === false ) {
					thisRow = [];
					for ( colCount = 0; colCount <= 6; colCount++ ) {
						if ( rowCount === 0 && colCount < startDay ) {
							if ( showOtherMonth === true ) {
								thisRow.push(prevLastDate + (colCount - startDay) + 1);
							} else {
								thisRow.push(false);
							}
						} else if ( rowCount > 3 && thisDay > lastDate ) {
							if ( showOtherMonth === true ) {
								thisRow.push(nextMonth); nextMonth++;
							} else {
								thisRow.push(false);
							}
							stop = true;
						} else {
							thisRow.push(thisDay); thisDay++;
						}
					}
					cal.push(thisRow);
				}
			}
			return cal;
		},
		dbGetRecurring: function(number) {
			var gen = this.dbCopy(),
				retty = [];
				
			if ( typeof number !== 'number' ) { number = 1; } 
			if ( number > 0 ) {
				for ( i=0; i<number; i++ ) { retty.push(gen.dbAdjust(2,7).dbCopy()); }
			} else if ( number < 0 ) {
				for ( i=0; i>number; i-- ) { retty.push(gen.dbAdjust(2,-7).dbCopy()); }
			}
			return retty;
		},
		dbParsePOSIX: function (date, format) {
			var self = this,
				adv = null,
				exp_input = null,
				exp_format = null,
				exp_temp = null, i,
				retty = null,
				run = { date: false, month: false },
				found_othr = [false,false,false],
				found_date = this.dbGetArray();
				
			if ( typeof date === 'undefined' || typeof format === 'undefined' ) { throw new Error("You must supply a date and format"); }
			
			adv = format;
			
			adv = adv.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper) {
				switch (oper) {
					case 'p':
					case 'P':
					case 'b':
					case 'B': return '(' + match + '|' +'.+?' + ')';
					case 'H':
					case 'k':
					case 'I':
					case 'l':
					case 'm':
					case 'M':
					case 'S':
					case 'u':
					case 'v':
					case 'W':
					case 'V':
					case 'U':
					case 'd': return '(' + match + '|' + (( pad === '-' ) ? '[0-9]{1,2}' : '[0-9]{2}') + ')';
					case 's': return '(' + match + '|' +'[0-9]+' + ')';
					case 'j': return '(' + match + '|' + '[0-9]{3}' + ')';
					case 'g':
					case 'y': return '(' + match + '|' +'[0-9]{2}' + ')';
					case 'G':
					case 'Y': return '(' + match + '|' +'[0-9]{1,4}' + ')';
					default: return '.+?';
				}
			});
			adv = new RegExp('^' + adv + '$');
			exp_input = adv.exec(date);
			exp_format = adv.exec(format);
			
			if ( exp_input === null || exp_input.length !== exp_format.length ) {
				throw new Error("Formats Mis-Match!");
			} else {
				for ( i=0; i<exp_input.length; i++ ) { //0y 1m 2d 3h 4i 5a 6epoch
					if ( exp_format[i] === '%s' )                { found_date[6] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*S$/) )         { found_date[5] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*M$/) )         { found_date[4] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*(H|k|I|l)$/) ) { found_date[3] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*d$/) )         { found_date[2] = parseInt(exp_input[i],10); run.date = true; }
					if ( exp_format[i].match(/^%.*m$/) )         { found_date[1] = parseInt(exp_input[i],10)-1; run.month = true;}
					if ( exp_format[i].match(/^%.*(Y|G)$/) )     { found_date[0] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*(W|V|U)$/) )   { found_othr[0] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*(u|w)$/) )     { found_othr[1] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*j$/) )         { found_othr[2] = parseInt(exp_input[i],10); }
					if ( exp_format[i].match(/^%.*(y|g)$/) ) { 
						if ( parseInt(exp_input[i],10) < 38 ) {
							found_date[0] = parseInt('20' + exp_input[i],10);
						} else {
							found_date[0] = parseInt('19' + exp_input[i],10);
						}
					}
					if ( exp_format[i].match(/^%(0|-)*(p|P)$/) ) {
						if ( exp_input[i].toLowerCase().charAt(0) === 'a' && found_date[3] === 12 ) {
							found_date[3] = 0;
						} else if ( exp_input[i].toLowerCase().charAt(0) === 'p' && found_date[3] !== 12 ) {
							found_date[3] = found_date[3] + 12;
						}
					}
					if ( exp_format[i] === '%B' ) {
						exp_temp = $.inArray(exp_input[i], self.dbLang[self.dbUseLang].monthsOfYear);
						if ( exp_temp > -1 ) { found_date[1] = exp_temp; }
					}
					if ( exp_format[i] === '%b' ) {
						exp_temp = $.inArray(exp_input[i], self.dbLang[self.dbUseLang].monthsOfYearShort);
						if ( exp_temp > -1 ) { found_date[1] = exp_temp; }
					}
				}
				if ( exp_format[0].match(/%s/) ) {
					retty = new Date(found_date[6] * 1000);
				} else if ( exp_format[0].match(/%(.)*(I|l|H|k|s|M)/) ) { 
					retty = new Date(found_date[0], found_date[1], found_date[2], found_date[3], found_date[4], found_date[5], 0);
					if ( found_date[0] < 100 ) { date.setFullYear(found_date[0]); }
				} else {
					retty = new Date(found_date[0], found_date[1], found_date[2], 0, 0, 0, 0); // Normalize time for raw dates
					if ( found_date[0] < 100 ) { date.setFullYear(found_date[0]); }
				}
				
				if ( run.month === false || run.date === false ) {
					if ( found_othr[0] !== false && run.month === false ) {
						if ( exp_format[0].match(/%(.)*W$/) ) { retty.dbSetWeek(1,found_othr[0]); }
						else if ( exp_format[0].match(/%(.)*U$/) ) { retty.dbSetWeek(0,found_othr[0]); }
						else { retty.dbSetWeek(4,found_othr[0]); }
						
						if ( run.date === true ) { retty.setDate(found_date[2]); }
					}
					if ( found_othr[1] !== false && run.date === false ) {
						if ( exp_format[0].match(/%(.)*u$/) ) { retty.dbAdjust(2,(found_othr[1]-1) - retty.getDay()); }
						else { retty.dbAdjust(2,(found_othr[1] - retty.getDay())); }
					}
					if ( found_othr[2] !== false && run.date === false && run.month === false ) {
						retty.dbSet(1,0).dbSet(2,1).dbAdjust(2,(found_othr[2]-1));
					}
				}
				
				
				return retty;
			}
		},
		dbSetISOWeek: function(num) { return this.dbSetWeek(4); },
		dbSetFullMonWeek: function(num) { return this.dbSetWeek(1); },
		dbSetFullSunWeek: function(num) { return this.dbSetWeek(0); },
		dbSetWeek: function (type,num) {
			if ( type === 4 ) {
				return this.dbSet(1,0).dbSet(2,1).dbSetFirstDay(4).dbAdjust(2,-3).dbAdjust(2,(num-1)*7);
			}
			return this.dbSet(1,0).dbSet(2,1).dbSetFirstDay(type).dbAdjust(2,(num-1)*7);
		},
		dbSetFirstDay: function (day) {
			this.dbSet(2,1).dbAdjust(2, (day - this.getDay()));
			if ( this.getDate() > 10 ) { this.dbAdjust(2,7); }
			return this;
		},
		dbGetFullSunWeek: function() { return this.dbGetWeek(0); },
		dbGetFullMonWeek: function() { return this.dbGetWeek(1); },
		dbGetISOWeek: function () { return this.dbGetWeek(4); },
		dbGetWeek: function(type) {
			var t1, t2;
					
			switch ( type ) {
				case 0:
					t1 = this.dbCopyModified([0,-1*this.getMonth()]).dbSetFirstDay(0);
					return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
				case 1:
					t1 = this.dbCopyModified([0,-1*this.getMonth()]).dbSetFirstDay(1);
					return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
				case 4:
					// this line is some bullshit.  but it does work.
					// (trap for dec 29, 30, or 31st being in the new year's week - these are the
					//  only 3 that can possibly fall like this)
					if ( this.getMonth() === 11 && this.getDate() > 28 ) { return 1; } 
							
					t1 = this.dbCopyModified([0,-1*this.getMonth()]).dbSetFirstDay(4).dbCopyModified([0,0,-3]);
					t2 = Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
							
					if ( t2 < 1 ) {
						t1 = this.dbCopyModified([-1,-1*this.getMonth()]).dbSetFirstDay(4).dbCopyModified([0,0,-3]);
						return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
					}
					return t2;
				default:
					return 0;
			}
		},
		dbGetOrdinal: function (number) {
			var thisLang; 
			
			if ( typeof number === 'undefined' ) {
				number = this.getDate();
			} else {
				number = parseInt(number,10);
			}
			if ( typeof this.dbLangOrdinal[this.dbUseLang] === 'undefined' ) {
				thisLang = 'default';
			} else { 
				thisLang = this.dbUseLang;
			}
			return this.dbLangOrdinal[thisLang].apply(this, [number]);
		},
		dbLangOrdinal: {
			'default': function (number) {
				// Return an ordinal suffix (1st, 2nd, 3rd, etc)
				var ending = number % 10;
				if ( number > 9 && number < 21 ) { return 'th'; }
				if ( ending > 3 ) { return 'th'; }
				return ['th','st','nd','rd'][ending];
			}
		},
		dbLang: {
			'default': {
				dateFormat: '%Y-%d-%m',
				dateFormatLong: '%A, %B %-d%o, %Y',
				daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				timeFormat: '%k:%M',
				meridiemLetters: ['am', 'pm']
			}
		},
		dbUseLang: 'default'
	});
})( jQuery );


