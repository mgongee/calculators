window.project_calculation = {};

window.calculation_rules =  {
	"number_of_sheets" : function() {
		/* Get initial parameters */
		var total_area_size = +parseFloat(get_saved_field_value('total_area_size'));
		var waste = +parseFloat(get_saved_field_value('waste'));
		var sheet_type = get_saved_field_raw_value('sheet_size');
		var sheet_area = +window.calculation_numbers['sheet_size'][sheet_type];
		
		/* Calculate value */
		var number_of_sheets = (total_area_size / sheet_area) * ((waste + 100) / 100);
		
		/* Save results of calculation */
		window.project_calculation['number_of_sheets'] = Math.ceil(number_of_sheets);
	},
	"number_of_fasteners": function() {
		/* Get initial parameters */
		var sheet_type = get_saved_field_raw_value('sheet_size');	
		var number_of_sheets = window.project_calculation['number_of_sheets'];	
		
		/* Calculate value */
		var number_of_fasteners = window.calculation_numbers["number_of_fasteners_per_sheet"][sheet_type] * number_of_sheets;
		
		/* Save results of calculation */
		window.project_calculation['number_of_fasteners'] = number_of_fasteners;
	},
	"amount_of_epoxy": function() {
		/* Get initial parameters */
		var sheet_type = get_saved_field_raw_value('sheet_size');	
		var number_of_sheets = window.project_calculation['number_of_sheets'];	
		
		/* Calculate value */
		var amount_of_epoxy = window.calculation_numbers["amount_of_epoxy_per_sheet"][sheet_type] * number_of_sheets;
		
		/* Set appropriate units */
		var unit = 'L';
		if (amount_of_epoxy > 1000) {
			amount_of_epoxy = Math.ceil(amount_of_epoxy / 1000);
			unit = 'L';
		}
		else {
			unit = 'mL';
		}
		$("#units_amount_of_epoxy").html(unit);
		
		/* Save results of calculation */
		window.project_calculation["amount_of_epoxy_units"] = unit;
		window.project_calculation['amount_of_epoxy'] = amount_of_epoxy;
	},
	"amount_of_constr_adhesive": function() {
		/* Get initial parameters */
		var sheet_type = get_saved_field_raw_value('sheet_size');	
		var number_of_sheets = window.project_calculation['number_of_sheets'];
		
		/* Calculate value */
		var amount_of_constr_adhesive = window.calculation_numbers["amount_of_constr_adhesive_per_sheet"][sheet_type] * number_of_sheets;
		
		/* Set appropriate units */
		var unit = 'mL';
		if (amount_of_constr_adhesive > 300) {
			amount_of_constr_adhesive = Math.ceil(amount_of_constr_adhesive / 300);
			unit = 'tubes';
		}
		else {
			unit = 'mL';
		}
		$("#units_amount_of_constr_adhesive").html(unit);
		
		/* Save results of calculation */
		window.project_calculation["amount_of_constr_adhesive_units"] = unit;
		window.project_calculation["amount_of_constr_adhesive"] = amount_of_constr_adhesive;
	},
};


