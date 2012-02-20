(function($, undefined ) {
	$.extend(Date.prototype, {
		_zPad: function (number) {
			if ( number < 10 ) { return "0" + String(number); }
			else { return String(number); }
		},
		dbGetISO: function () { 
			/* Get the ISO 8601 representation */
			return String(this.getFullYear()) + '-' + (( this.getMonth() < 9 ) ? "0" : "") + String(this.getMonth()+1) + '-' + ((this.getDate() < 10 ) ? "0" : "") + String(this.getDate());
		},
		dbGetCompare: function() {
			/* Get an easily comparable Integer DATE */
			return parseInt(this.dbGetISO().replace(/-/g,''),10);
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
		
	});
})( jQuery );
/*
Date.prototype.getComp = function () { return parseInt(this.getISO().replace(/-/g,''),10); }
Date.prototype.copy = function() { return this.copymod(); }
Date.prototype.copymod = function(adj,over) { 
	if ( typeof adj === 'undefined' ) { adj = [0,0,0,0,0,0]; }
	if ( typeof over === 'undefined' ) { over = [0,0,0,0,0,0]; }
	while ( adj.length < 6 ) { adj.push(0); }
	while ( over.length < 6 ) { over.push(0); }
	return new Date(((over[0] > 0 ) ? over[0] : this.getFullYear() + adj[0]),((over[1] > 0 ) ? over[1] : this.getMonth() + adj[1]),((over[2] > 0 ) ? over[2] : this.getDate() + adj[2]),((over[3] > 0 ) ? over[3] : this.getHours() + adj[3]),((over[4] > 0 ) ? over[4] : this.getMinutes() + adj[4]),((over[5] > 0 ) ? over[5] : this.getSeconds() + adj[5]),0);
}
Date.prototype.getEpoch = function() { return (this.getTime() - this.getMilliseconds()) / 1000; }
Date.prototype.adjust = function (type, amount) {
	switch (type) {
		case 'y': this.setFullYear(this.getFullYear() + amount); break;
		case 'm': this.setMonth(this.getMonth() + amount); break;
		case 'd': this.setDate(this.getDate() + amount); break;
		case 'h': this.setHours(this.getHours() + amount); break;
		case 'i': this.setMinutes(this.getMinutes() + amount); break;
		case 's': this.setSeconds(this.getSeconds() + amount); break;
	}
	return this.getTime();
}*/
