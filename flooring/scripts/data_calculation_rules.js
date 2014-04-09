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
		
		/* Calculate value */
		var sheet_height = window.calculation_numbers["sheet_height"][sheet_type]; // in mm
		var sheet_width = window.calculation_numbers["sheet_width"][sheet_type];  // in mm
		var areas = get_saved_areas();
		
		var total_join_length = 0;
		for (var i in areas) {
			var wall_height = areas[i]["length"];  // in mm
			var wall_width = areas[i]["width"];  // in mm
			
			// no of Vertical Joins (nV)	 =   ceil (Ww / Ws) – 1
			// no of Hoirizontal  Joins(nH)  =   ceil (Hw / Hs) – 1
			var nVJoins = Math.ceil( wall_height / sheet_height ) - 1;
			var nHJoins = Math.ceil( wall_width / sheet_width ) - 1;
			
			// Total Join Length = nV x Hw + nH x Ww	
			var wall_total = (nVJoins * wall_height) + (nHJoins * wall_width);
			
			total_join_length += wall_total;
		}
		
		var epoxy_per_joint = window.calculation_numbers["amount_of_epoxy_per_sheet"][sheet_type]; // per meter
		epoxy_per_joint = epoxy_per_joint * 0.001; // per millimeter
		
		var amount_of_epoxy = epoxy_per_joint * total_join_length;
		
		/* Set appropriate units */
		var unit = 'L';
		var litre = 1000;
		var unit_cost_divider = 1;
		
		if (amount_of_epoxy > litre) {
			amount_of_epoxy = Math.ceil(amount_of_epoxy / litre);
			unit = 'L';
			unit_cost_divider = 1;
		}
		else {
			unit = 'mL';
			unit_cost_divider = litre;
		}
		$("#units_amount_of_epoxy").html(unit);
		
		/* Save results of calculation */
		window.project_calculation["amount_of_epoxy_units"] = unit;
		window.project_calculation["epoxy_unit_cost_divider"] = unit_cost_divider;
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
		var tube = window.calculation_numbers["amount_of_adhesive_in_tube"];
		var unit_cost_divider = 1;
		
		if (amount_of_constr_adhesive > tube) {
			amount_of_constr_adhesive = Math.ceil(amount_of_constr_adhesive / tube);
			unit = 'tubes';
			unit_cost_divider = 1;
		}
		else {
			unit = 'mL';
			unit_cost_divider = tube;
		}
		$("#units_amount_of_constr_adhesive").html(unit);
		
		/* Save results of calculation */
		window.project_calculation["amount_of_constr_adhesive_units"] = unit;
		window.project_calculation["adhesive_unit_cost_divider"] = unit_cost_divider;
		window.project_calculation["amount_of_constr_adhesive"] = amount_of_constr_adhesive;
	}
};


alert("777");