/**
 * Serialize object
 * Author: unknown (found on internet)
 * License: MIT
 */
function serializeObject( $form ) {
	var serialized = {};
    $form.find('[name]').each(function () {
		var type = $(this).attr('type'),
        	name = $(this).attr('name'),
        	value = $(this).val();
        if ( type == 'checkbox' || type == 'radio' )
        {
        	if ( !$(this).prop('checked') )
        	{
        		return;
        	}
        }
       	else if ( value === undefined || value == '' )
       	{
       		return;
        }

        var nameBits = name.split('[');
        var previousRef = serialized;
        for(var i = 0, l = nameBits.length; i < l;  i++) {
            var nameBit = nameBits[i].replace(']', '');
            if(!previousRef[nameBit]) {
                previousRef[nameBit] = {};
            }
            if(i != nameBits.length - 1) {
                previousRef = previousRef[nameBit];
            } else if(i == nameBits.length - 1) {
                previousRef[nameBit] = value;
            }
        }
    });
    return serialized;
};
