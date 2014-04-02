/**
 * There are functions that related to project calculaton
 */

calculate_project = function(step_name) {
	window.project_calculation = {};
	for (var field_name in window.calculation_rules) {
		window.calculation_rules[field_name]();
	}
};

/**
 * There are functions that related to project estimation
 */

estimate_project = function() {
	// get the project parameters which are stored in DB
	for (var field_name in window.estimation_elements) {

		var field_label = window.estimation_elements[field_name]["label"];
		var field_value = get_saved_field_value(field_name);
		var field_units = window.estimation_elements[field_name]["units"];
		
		var estimation_row = "<tr><td>" + field_label + "</td><td>" + field_value + "</td><td>" + field_units +"</td></tr>";
		$("table#estimation_values tbody").append(estimation_row);
		window.estimation_elements[field_name]["value"] = field_value;
		
	}
	
	// calculate total product estimation
	var total_area_size = +window.estimation_elements['total_area_size']['value'];
	var waste = +window.estimation_elements['waste']['value'];
	var product_estimation = total_area_size * ((100 + waste)/100);
	
	$("#product_estimation").html(product_estimation.toFixed(2));
};

calculate_labour_rate = function() {
	var labour_flooring_cost = parseFloat($("#labour\\[flooring\\]").val());
	var labour_floor_finish = parseFloat($("#labour\\[floor_finish\\]").val());
	var labour_cost = labour_flooring_cost + labour_floor_finish;
	
	if (!isNaN(labour_cost) && (labour_cost > 0)) {
		$("#labour\\[subtotal\\]").val(labour_cost);
	}
	else {
		$("#labour\\[subtotal\\]").val("0");
	}
}

/**
 * Calculates total bill cost and cost per sqm
 * must be called after estimate_project()
 */
calculate_total_bill = function() {
	var total_area_estimation = parseFloat($("#product_estimation").html());
	var labour_cost = parseFloat($("#labour\\[subtotal\\]").val());
	var total_cost = labour_cost * total_area_estimation;
	
	$("#bill_of_quantities .bill_item").each(function(){
		var quantity = 0;
		var cost = 0;
		
		$(this).find(".bill_item_quantity").each(function(){
			quantity = parseFloat($(this).val());
		});
		$(this).find(".bill_item_cost").each(function(){
			cost = parseFloat($(this).val());
		});
		
		if (!isNaN(cost) && !isNaN(quantity)) {
			total_cost += parseFloat(quantity * cost);
		}
	});
	
	total_cost = total_cost.toFixed(2);
	
	if (!isNaN(total_cost) && (total_cost > 0)) {
		if (!isNaN(total_area_estimation) && (total_area_estimation > 0)) {
			var total_cost_per_sqm = total_cost / total_area_estimation;
			total_cost_per_sqm = total_cost_per_sqm.toFixed(2);
		}
		else {
			total_cost_per_sqm = 0;
		}
	}
	else {
		total_cost_per_sqm = 0;
		total_cost = 0;
	}
	$("#total_cost").val(total_cost);
	$("#total_cost_per_sqm").val(total_cost_per_sqm);
}

get_saved_field_raw_value = function(field_name) {
	var field_value = false;
	var project_json = $("#projectData").html();
	var project_data = jQuery.parseJSON(project_json);
	
	for (var step in project_data) {
		var project_fields_data = project_data[step];
		for (var project_field_name in project_fields_data) {
			if (project_field_name === field_name) {
				field_value = project_fields_data[field_name];
			}
		}
	}
	return field_value;
};

/**
 * Gets the value stored in the JSON string (which loaded from the DB)
 * @param {String} field_name
 * @returns {mixed}
 */
get_saved_field_value = function(field_name) {
	
	var project_json = $("#projectData").html();
	var project_data = jQuery.parseJSON(project_json);

	for (var step in project_data) {
		var project_fields_data = project_data[step];
		
		for (var project_field_name in project_fields_data) {
			if (project_field_name === field_name) {

				var field_value = project_fields_data[field_name];
				if (typeof window.form_elements[step]["fields"][field_name] !== "undefined") {
					var field_type = window.form_elements[step]["fields"][field_name]["type"];
				}
				else {
					var field_type = "text";
				}
				
				if (field_type === "text") {
					return field_value;
				}
				else if (field_type === "list") {
					var full_field_name = step + "_" + field_name;
					return window.list_data[full_field_name][field_value];
				}
			}
		}
	}
};


/**
 * Gets the areas stored in the JSON string (which loaded from the DB)
 * @param {String} field_name
 * @returns {mixed}
 */
get_saved_areas = function() {
	
	var project_json = $("#projectData").html();
	var project_data = jQuery.parseJSON(project_json);

	return project_data["step2"]["areas"];
};

/**
 * Creates the initial bill when the age is loaded
 */
create_bill_list = function (){
	
	add_product();
	add_fasteners();
	add_epoxy();
	add_adhesive();
};

/**
 * Sets up the bill item field (the one with the number "item_number")
 * @param {String} item_number number of the field being set up
 * @param {String} id_number ID of the product
 * @param {String} item_name name of the product
 * @param {String} quantity quantity of the product
 * @param {String} units
 * @param {String} cost_unit
 * @returns {undefined}
 */
fill_bill_item = function(item_number, id_number, item_name, quantity, units, cost_unit){
	$("#bill\\[" + item_number + "\\]\\[id_number\\]").val(id_number);
	$("#bill\\[" + item_number + "\\]\\[description\\]").val(item_name);
	$("#bill\\[" + item_number + "\\]\\[quantity\\]").val(quantity);
	$("#bill\\[" + item_number + "\\]\\[unit\\]").val(units);
	$("#bill\\[" + item_number + "\\]\\[cost_unit\\]").val(cost_unit);
};

add_product = function() {
	
	// get product info
	var id_number = "400080";
	var cost_unit = 555;
	var product_name = get_saved_field_value("product");	
	var type_of_frame = get_saved_field_raw_value("type_of_frame");
	var type_of_frame_code = window.calculation_numbers["type_of_frame_codes"][type_of_frame];
	var sheet_size = get_saved_field_value("sheet_size");
	var full_product_name = product_name + " (" + sheet_size + ", " + type_of_frame_code + ")";	
	var quantity = window.project_calculation["number_of_sheets"];


	// add item into bill
	var item_number = add_bill_item();
	fill_bill_item(item_number, id_number,full_product_name,quantity,"each",cost_unit);
};


add_fasteners = function() {
	
	// get item info
	var id_number = "400084";
	var cost_unit = 21;	
	var item_name = "HardieDrive Screws 8x32";
	var quantity = window.project_calculation["number_of_fasteners"];

	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, id_number,item_name,quantity,"each",cost_unit);
};

add_epoxy = function() {
	
	// get item info
	var id_number = "400079";
	var cost_unit = 21 / window.project_calculation["epoxy_unit_cost_divider"];
	var item_name = "Epoxy";
	var quantity = window.project_calculation["amount_of_epoxy"];
	var units = window.project_calculation["amount_of_epoxy_units"];
	
	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, id_number,item_name,quantity,units,cost_unit);
};

add_adhesive = function() {
	
	// get item info
	var id_number = "400083";
	var cost_unit = 21 / window.project_calculation["adhesive_unit_cost_divider"];
	var item_name = "Construction Adhesive";
	var quantity = window.project_calculation["amount_of_constr_adhesive"];
	var units = window.project_calculation["amount_of_constr_adhesive_units"];
	
	// add item into bill
	var item_number = add_bill_item();
	fill_bill_item(item_number, id_number,item_name,quantity,units,cost_unit);
};

load_prices = function(data) {
	for(var i in data) {
		var product_id = data[i].pid;
		var price = data[i].price;
		$(".bill_item_id").each(function(){
			var item_product_id = $(this).val();
			if (item_product_id == product_id) {
				var this_id = $(this).attr('id');
				var target_id = this_id.replace(new RegExp("\\[id_number\\]",'g'),"[cost_unit]")
						.replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
				$('#' + target_id).val(price);
			}
		});
	}
};