/**
 * There are some service functions
 */

/**
 * Checks if the given value is integer number
 * @param {mixed} value
 * @returns {Boolean}
 */
function is_int(value){
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		return true;
	} else {
		return false;
	}
}

/**
 * Checks if the given value is integer of float number
 * @param {mixed} value
 * @returns {Boolean}
 */
function is_float(n) {
	return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
}
