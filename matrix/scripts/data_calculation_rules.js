window.project_calculation = {};

window.calculation_rules =  {
	"total_opening_area" : function() {
		/* Get initial parameters */
		var total_opening_area = 0;
		var subtotal_opening_areas = get_saved_field_raw_value('total_opening_area');
		
		/* Calculate value */
		for (var wall_number in subtotal_opening_areas) {
			total_opening_area += +parseFloat(subtotal_opening_areas[wall_number]);
		}
		
		if (isNaN(total_opening_area)) {
			total_opening_area = 0;
		}
		
		/* Save results of calculation */
		window.project_calculation['total_opening_area'] = total_opening_area.toFixed(2);
	},
	"total_product_estimation" : function() {
		/* Get initial parameters */
		var total_wall_area = parseFloat(get_saved_field_raw_value('total_wall_area'));
		var total_gable_area = parseFloat(get_saved_field_raw_value('total_gable_area'));
		var total_opening_area = parseFloat(window.project_calculation['total_opening_area']);
	
		/* Calculate value */
		var total_product_estimation = +total_wall_area + total_gable_area - total_opening_area;
	
		/* Save results of calculation */
		window.project_calculation['total_product_estimation'] = total_product_estimation.toFixed(2);
	},
	"area_of_sarking" : function() {
		/* Get initial parameters */
		var total_wall_area = get_saved_field_raw_value('total_wall_area');
		var allowance = get_saved_field_raw_value('allowance');
	
		/* Calculate value */
		var area_of_sarking = total_wall_area * ((allowance / 100) + 1);
		
		/* Save results of calculation */
		window.project_calculation['area_of_sarking'] = area_of_sarking.toFixed(2);
	},	
	"number_of_planks" : function() {
		/* Get initial parameters */
		var total_product_estimation = window.project_calculation['total_product_estimation'];
		var allowance = +parseFloat(get_saved_field_value('allowance'));
		var product_code = get_saved_field_raw_value('product');
		
		var plank_length = +window.calculation_numbers['plank_length'][product_code];
		
		/* Calculate value */
		var number_of_planks = total_product_estimation * ((allowance / 100) + 1) / plank_length;
		
		/* Save results of calculation */
		window.project_calculation['number_of_planks'] = Math.ceil(number_of_planks);
	},
	"spacing": function(){
		/* Get initial parameters */
		var wind_zone = get_saved_field_raw_value('wind_zone');
		var type_of_frame = get_saved_field_raw_value('type_of_frame');	
		
		/* Calculate value */
		var spacing = window.calculation_numbers["spacing_for_wind_zone"][wind_zone];
		if (type_of_frame == "masonry_substrate") {
			spacing = 400;
		}
		
		/* Save results of calculation */
		window.project_calculation['spacing'] = spacing;
	},
	"fasteners_type": function() {
		/* Get initial parameters */
		var type_of_frame = get_saved_field_raw_value('type_of_frame');	
		
		/* Calculate value */
		var	fasteners_type = window.calculation_numbers["fastener_type_for_frame"][type_of_frame];
		
		/* Save results of calculation */
		window.project_calculation['fasteners_type'] = fasteners_type;
	},
	"number_of_fasteners": function() {
		/* Get initial parameters */
		var spacing = window.project_calculation['spacing'];	
		var product_code = get_saved_field_raw_value('product');
		var number_of_planks = window.project_calculation['number_of_planks'];	
		
		/* Calculate value */
		var number_of_fasteners = window.calculation_numbers["number_of_fasteners_per_spacing_and_plank"][spacing + '_' + product_code]
				* number_of_planks;
		
		/* Save results of calculation */
		window.project_calculation['number_of_fasteners'] = number_of_fasteners;
	},
	"amount_of_sealant": function() {
		/* Get initial parameters */
		var number_of_planks = window.project_calculation['number_of_planks'];
		
		/* Calculate value */
		var amount_of_sealant = number_of_planks * window.calculation_numbers["amount_of_sealant_per_plank"];
		
		//var amount_of_sealant = amount_of_sealant * ((allowance / 100) + 1);
		
		/* Set appropriate units */
		var unit = 'mL';
		var tube = window.calculation_numbers["amount_of_sealant_in_tube"];
		var unit_cost_divider = 1;
		
		if (amount_of_sealant >= tube) {
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


window.wall_value_getters =  {
	'product': function() {
		return $("#step1\\[product\\]").val();
	},
	'type_of_frame': function() {
		return $("#step1\\[type_of_frame\\]").val();
	},
	'application': function() {
		return $("#step1\\[application\\]").val();
	},
	'sheet_size': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[sheet_size\\]").val();
	},
	'frame_spacing': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[frame_spacing\\]").val();
	},
	'orientation': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[orientation\\]").val();
	},
	'height': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[height\\]").val();
	},
	'length': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[length\\]").val();
	},
	'size': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[size\\]").val();
	},
	'fastener_type': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[fastener_type\\]").val();
	},
	'perforated_paper_tape': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[perforated_paper_tape\\]").val();
	},
	'no_of_fasteners_per_sheet': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[no_of_fasteners_per_sheet\\]").val();
	},
	'amount_of_putty': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[amount_of_putty\\]").val();
	},
	'amount_of_sealant': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[amount_of_sealant\\]").val();
	},
	'amount_of_tape': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[amount_of_tape\\]").val();
	},
	'control_joints': function(wall_number) {
		return $("#step2\\[walls\\]\\[" + wall_number+ "\\]\\[control_joints\\]").val();
	}
};

window.wall_calculation_rules =  {
	'frame_spacing': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_to_spacing'][product][application][sheet_size] !== 'undefined') {
			var frame_spacing =  window.calculation_numbers['product_application_size_to_spacing'][product][application][sheet_size];
			return frame_spacing;
		}
		else return false;
	},
	'fastener_type': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var type_of_frame = get_wall_value('type_of_frame');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_frame_type_to_fastener_type'][type_of_frame][product][application][sheet_size] !== 'undefined') {
			var fastener_type =  window.calculation_numbers['product_application_size_frame_type_to_fastener_type'][type_of_frame][product][application][sheet_size];
			return fastener_type;
		}
		else return false;
	},
	'perforated_paper_tape': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_to_paper_tape'][product][application][sheet_size] !== 'undefined') {
			var perforated_paper_tape =  window.calculation_numbers['product_application_size_to_paper_tape'][product][application][sheet_size];
			return perforated_paper_tape;
		}
		else return false;
	},
	'no_of_fasteners_per_sheet': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var type_of_frame = get_wall_value('type_of_frame');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		var orientation = get_wall_value('orientation', wall_number);
		var spacing = get_wall_value('frame_spacing', wall_number);
		
		var spacing_code = '';
		if ((spacing == 400) || (spacing == 406)) {
			spacing_code = '400_406';
		}
		else if ((spacing == 600) || (spacing == 610)) {
			spacing_code = '600_610';
		}
		else {
			alert('Error when calculating no of fasteners per sheet. Check spacing: must be 400, 406, 600 or 610')
			return false;
		}
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_spacing_to_fasteners_per_sheet'][product][application][sheet_size][spacing_code][orientation][type_of_frame] !== 'undefined') {
			var fastener_type =  window.calculation_numbers['product_application_size_spacing_to_fasteners_per_sheet'][product][application][sheet_size][spacing_code][orientation][type_of_frame];
			return fastener_type;
		}
		else return false;
	},
	'size': function(wall_number) {
		/* Get initial parameters */
		var height = get_wall_value('height', wall_number);
		var length = get_wall_value('length', wall_number);
		
		/* Find target value */
		if (is_float(height) && is_float(length)) {
			var size = parseFloat(height) * parseFloat(length);

			// note that dimensions are fillen in millimeters, and wall area must be in square meters,
			// so the square must be divided by 1000*1000
			size = size * 0.000001;
			return size.toFixed(2);
		}
		else return false;
	},
	'height': function(wall_number) {
		/* Get initial parameters */
		var size = parseFloat(get_wall_value('size', wall_number));
		var length = parseFloat(get_wall_value('length', wall_number));
	
		// note that dimensions are fillen in millimeters, and wall is filles in square meters,
		// so the square must be multiplied by 1000*1000
		size = size * 1000000;

		/* Find target value */
		if (!is_float(size) && is_float(length)) {
			if (length != 0 ) {
				var height = Math.round(size / length);
				return height.toFixed(2);
			}
			else return 0;
		}
		else return false;
	},
	'amount_of_putty': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		var wall_height = parseFloat(get_wall_value('height', wall_number));
		var wall_length = parseFloat(get_wall_value('length', wall_number));
		var amount_of_tape = parseFloat(get_wall_value('amount_of_tape', wall_number));
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_to_putty_amount'][product][application][sheet_size] !== 'undefined') {
			
			var amount_of_putty_per_meter_of_tape =  window.calculation_numbers['product_application_size_to_putty_amount'][product][application][sheet_size];
		
			var amount_of_putty_per_millimeter_of_tape = amount_of_putty_per_meter_of_tape * 0.001; // per millimeter
			
			var amount_of_putty = amount_of_putty_per_millimeter_of_tape * amount_of_tape;

			return amount_of_putty.toFixed(2);
		}
		else return false;
	},
	'amount_of_sealant': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application');
		var sheet_size = get_wall_value('sheet_size', wall_number);
		var wall_length = get_wall_value('length', wall_number);
		
		/* Find target value */
		if (typeof window.calculation_numbers['product_application_size_to_sealant_amount'][product][application][sheet_size] !== 'undefined') {
			var amount_of_sealant_per_mm =  window.calculation_numbers['product_application_size_to_sealant_amount'][product][application][sheet_size];
			console.log("amount_of_sealant_per_mm", amount_of_sealant_per_mm);
			var amount_of_sealant = wall_length * amount_of_sealant_per_mm;
			return amount_of_sealant.toFixed(2);
		}
		else return false;
	},
	'amount_of_tape': function(wall_number) {
		/* Get initial parameters */
		var sheet_size = get_wall_value('sheet_size', wall_number);
		var wall_height = parseFloat(get_wall_value('height', wall_number));
		var wall_length = parseFloat(get_wall_value('length', wall_number));
		
			/* Calculate value */
		if ((wall_height > 0) &&(wall_length > 0)) {
			var sheet_height = window.calculation_numbers["sheet_height"][sheet_size]; // in mm
			var sheet_width = window.calculation_numbers["sheet_width"][sheet_size];  // in mm

			// no of Vertical Joins (nV)	 =   ceil (Ww / Ws) – 1
			// no of Hoirizontal  Joins(nH)  =   ceil (Hw / Hs) – 1
			var nVJoins = Math.ceil( wall_height / sheet_height ) - 1;
			var nHJoins = Math.ceil( wall_length / sheet_width ) - 1;

			// Total Join Length = nV x Hw + nH x Ww	
			var amount_of_tape = (nVJoins * wall_height) + (nHJoins * wall_length);

			return amount_of_tape.toFixed(2);
		}
		else return false;
	},
	'control_joints': function(wall_number) {
		//to do later
		return 1;
	}
};

window.list_option_calculation_rules = {
	'application': function() {
		/* Get initial parameters */
		var product = get_wall_value('product');
		
		/* Find target list */
		if (typeof window.calculation_numbers['product_to_application'][product] !== 'undefined') {
			var application_codes =  window.calculation_numbers['product_to_application'][product];
			var application_options = {'' : 'Please select'};
			
			/* Find target options */
			for (var i in application_codes) {
				if (application_codes.hasOwnProperty(i)) { 
					var application_code = application_codes[i];
					application_options[application_code] = window.list_data['step1_application'][application_code];
				}
			}
			return application_options;
		}
		else return false;
	},
	'sheet_size': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application', wall_number);
		
		/* Find target list */
		if (typeof window.calculation_numbers['product_application_to_size'][product][application] !== 'undefined') {
			var sheet_sizes_codes =  window.calculation_numbers['product_application_to_size'][product][application];
			var sheet_sizes_options = {'' : 'Please select'};
			
			/* Find target options */
			for (var i in sheet_sizes_codes) {
				if (sheet_sizes_codes.hasOwnProperty(i)) { 
					var sheet_sizes_code = sheet_sizes_codes[i];
					sheet_sizes_options[sheet_sizes_code] = window.list_data['step2_sheet_size'][sheet_sizes_code];
				}
			}
			return sheet_sizes_options;
		}
		else return false;
	},
	'orientation': function(wall_number) {
		/* Get initial parameters */
		var product = get_wall_value('product');
		var application = get_wall_value('application', wall_number);
		var sheet_size = get_wall_value('sheet_size', wall_number);
		
		/* Find target list */
		if (typeof window.calculation_numbers['product_application_size_to_orientation'][product][application][sheet_size] != 'undefined') {
			var orientation_codes =  window.calculation_numbers['product_application_size_to_orientation'][product][application][sheet_size];
			console.log("orientation_codes",orientation_codes);
			var orientation_options = {};
			
			/* Find target options */
			for (var i in orientation_codes) {
				if (orientation_codes.hasOwnProperty(i)) { 
					var orientation_code = orientation_codes[i];
					orientation_options[orientation_code] = window.list_data['step2_orientation'][orientation_code];
				}
			}
			return orientation_options;
		}
		else return false;
	}
};
