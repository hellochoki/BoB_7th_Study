/**
 * Bringing numeric string to integer
 * Author: unknown (found on internet)
 * License: MIT
 */
;$.fn.digits = function () {
	return this.each( function () {
		var num = $( this ).text();
		if ( num ) {
			num = isNaN( num ) || num === '' || num === null ? 0 : num;
		} else {
			num = $( this ).val()
			if ( num ) {
				num = isNaN( num ) || num === '' || num === null ? 0 : num;
			}
		}
		$( this ).val( num );
	} )
};
