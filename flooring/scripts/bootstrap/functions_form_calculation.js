/**
 * There are functions that related to project calculaton
 */

calculate_project = function(step_name) {
	for (var field_name in calculation_rules) {
		calculated_value = calculation_rules[field_name]();
		$("#" + step_name + "\\[" + field_name + "\\]").val(calculated_value);
	}
};