window.project_calculation = {};

window.calculation_rules =  {
	"total_opening_area" : function() {
		/* Get initial parameters */
		var total_opening_area = 0;
		var subtotal_opening_areas = get_saved_field_raw_value('total_opening_area');
		
		/* Calculate value */
		for (var wall_number in subtotal_opening_areas) {
			var area = parseFloat(subtotal_opening_areas[wall_number]);
			if (!isNaN(area)) {
				total_opening_area += area;
			}
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
		
		/* Save results of calculation */
		window.project_calculation['amount_of_sealant'] = amount_of_sealant;
	}
};


