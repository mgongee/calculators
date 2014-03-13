/**
 * There are functions that related to project calculaton
 */

calculate_project = function(step_name) {
	for (var field_name in window.calculation_rules) {
		var calculated_value = window.calculation_rules[field_name]();
		if (isNaN(calculated_value)) {
			$("#" + step_name + "\\[" + field_name + "\\]").val("0");
		}
		else {
			$("#" + step_name + "\\[" + field_name + "\\]").val(calculated_value);
		}
		
	}
};