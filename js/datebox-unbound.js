(function($, undefined ) {
	$.extend(Date.prototype, {
		_dbZPad: function (number) {
			if ( number < 10 ) { return "0" + String(number); }
			else { return String(number); }
		},
		dbGetPOSIX: function (format, thisLang) {
			var self = this,
				thisLang = ( typeof thisLang === 'undefined' ) ? self.dbUseLang : thisLang;
				
			if ( typeof self.dbLang[thisLang] === 'undefined' ) { thisLang = 'default'; }
				
			if ( typeof format === 'undefined' ) { throw new Error("No format specified"); }
				
			format = format.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper, offset, s) {
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
					case 'w': // Day of week
						return self.getDay();
					case 'y': // Year (2 digit)
						return self.getFullYear().toString().substr(2,2);
					case 'Y': // Year (4 digit)
						return self.getFullYear();
					case 'o': // Ordinals
						return self.dbGetOrdinal();
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
		dbAdjust: function (type, amount) {
			/* Adjust the date.  Yes, this is chainable */
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
		dbGetOrdinal: function (number,thisLang) {
			if ( typeof number === 'undefined' ) {
				number = this.getDate();
			}
			if ( typeof thisLang === 'undefined' ) {
				thisLang = this.dbUseLang;
			} 
			if ( typeof this.dbLangOrdinal[thisLang] === 'undefined' ) {
				thisLang = 'default';
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
				meridiemLetters: ['am', 'pm'],
			}
		},
		dbUseLang: 'default'
	});
})( jQuery );


