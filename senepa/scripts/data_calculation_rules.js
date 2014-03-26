window.project_calculation = {};

window.calculation_rules =  {
	"number_of_boards" : function() {
		/* Get initial parameters */
		var total_length_size = +parseFloat(get_saved_field_value('total_length_size'));
		var allowance = +parseFloat(get_saved_field_value('allowance'));
		var product_size = get_saved_field_raw_value('product_size');
		
		var board_length = +window.calculation_numbers['board_length'][product_size];
		
		/* Calculate value */
		var number_of_boards = total_length_size * ((allowance / 100) + 1) / board_length;
		
		/* Save results of calculation */
		window.project_calculation['number_of_boards'] = Math.ceil(number_of_boards);
	},
	"fasteners_type": function() {
		/* Get initial parameters */
		var type_of_frame = get_saved_field_raw_value('type_of_frame');	
		var product_size = get_saved_field_raw_value('product_size');
		
		/* Calculate value */
		if (type_of_frame == "steel_0.55_to_1.66mm_bmt") {
			var fasteners_type = window.calculation_numbers["fastener_type_for_board"][product_size];
		}
		else if (type_of_frame == "timber") {
			fasteners_type = window.calculation_numbers["fastener_type_for_timber"];
		}
		
		/* Save results of calculation */
		window.project_calculation['fasteners_type'] = fasteners_type;
	},
	"number_of_fasteners": function() {
		/* Get initial parameters */
		var product_size = get_saved_field_raw_value('product_size');	
		var number_of_boards = window.project_calculation['number_of_boards'];	
		
		/* Calculate value */
		var number_of_fasteners = window.calculation_numbers["number_of_fasteners_per_board"][product_size] * number_of_boards;
		
		/* Save results of calculation */
		window.project_calculation['number_of_fasteners'] = number_of_fasteners;
	},
	"amount_of_sealant": function() {
		/* Get initial parameters */
		var product_size = get_saved_field_raw_value('product_size');	
		var number_of_boards = window.project_calculation['number_of_boards'];	
		var allowance = +parseFloat(get_saved_field_value('allowance'));
		
		/* Calculate value */
		var amount_of_sealant = window.calculation_numbers["amount_of_sealant_per_board"][product_size] * number_of_boards;
		var amount_of_sealant = amount_of_sealant * ((allowance / 100) + 1);
		
		/* Set appropriate units */
		var unit = 'mL';
		var tube = window.calculation_numbers["amount_of_sealant_in_tube"];
		var unit_cost_divider = 1;
		
		if (amount_of_sealant > tube) {
			amount_of_sealant = Math.ceil(amount_of_sealant / tube);
			unit = 'tubes';
			unit_cost_divider = 1;
		}
		else {
			unit = 'mL';
			unit_cost_divider = tube;
		}
		$("#units_amount_of_sealant").html(unit);
		
		/* Save results of calculation */
		window.project_calculation["amount_of_sealant_units"] = unit;
		window.project_calculation["sealant_unit_cost_divider"] = unit_cost_divider;
		window.project_calculation['amount_of_sealant'] = amount_of_sealant;
	}
};


