/**
 * There are functions that related to project calculaton
 */

calculate_project = function() {

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
		var source = window.estimation_elements[field_name]["source"];

		if (source === "js") {
			var field_value = window.estimation_elements[field_name]["value"];
		}
		else {
			var field_value = get_saved_field_value(field_name);
		}
		
		var field_units = window.estimation_elements[field_name]["units"];
		
		var estimation_row = "<tr><td>" + field_label + "</td><td id='estimation_value__" + field_name + "'>" + field_value + "</td><td>" + field_units +"</td></tr>";
		$("table#estimation_values tbody").append(estimation_row);
		window.estimation_elements[field_name]["value"] = field_value;
	}
	
	var spacing = window.project_calculation['spacing'];
	$("#estimation_value__stub_and_fasteners_spacing").html(spacing + 
		'<input type="hidden" id="spacing" name="spacing" value="' + spacing + '">');
	
	var total_opening_area = window.project_calculation['total_opening_area'];
	$("#estimation_value__total_opening_area").html(total_opening_area + 
		'<input type="hidden" id="total_opening_area" name="total_opening_area" value="' + total_opening_area + '">');
	
	
	var total_product_estimation = window.project_calculation['total_product_estimation'];
	$("#estimation_value__total_product_estimation").html(total_product_estimation +
		'<input type="hidden" id="total_product_estimation" name="total_product_estimation" value="' + total_product_estimation + '">');
	
};

calculate_labour_rate = function() {
	var labour_painting_cost = parseFloat($("#labour\\[painting\\]").val());
	var labour_cladding_cost = parseFloat($("#labour\\[cladding\\]").val());
	var labour_cost = labour_painting_cost + labour_cladding_cost;
	
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
	var total_product_estimation = +window.project_calculation['total_product_estimation'];
	var labour_cost = parseFloat($("#labour\\[subtotal\\]").val());
	var total_cost = labour_cost * total_product_estimation;
	
	// add prices of materials
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
		if (!isNaN(total_product_estimation) && (total_product_estimation > 0)) {
			var total_cost_per_m = total_cost / total_product_estimation;
			total_cost_per_m = total_cost_per_m.toFixed(2);
		}
		else {
			total_cost_per_m = 0;
		}
	}
	else {
		total_cost_per_m = 0;
		total_cost = 0;
	}
	$("#total_cost").val(total_cost);
	$("#total_cost_per_m").val(total_cost_per_m);
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
				if (typeof project_fields_data[field_name] != 'undefined') {
					var field_value = project_fields_data[field_name];
					if (typeof window.form_elements[step]["fields"][field_name] !== "undefined") {
						var field_type = window.form_elements[step]["fields"][field_name]["type"];
					}
					else {
						var field_type = "text";
					}

					if (field_type === "text") {
						console.log(field_name, field_value);
						return field_value;
					}
					else if (field_type === "list") {
						var full_field_name = step + "_" + field_name;
						return window.list_data[full_field_name][field_value];
					}
				}
				else return 0;
			}
		}
	}
	
	return 0;
};

/**
 * Creates the initial bill when the age is loaded
 */
create_bill_list = function (){
	add_product(); // planks
	add_fasteners();
	add_sealant();
	
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
	var product_code = get_saved_field_raw_value("product");	
	
	// get item info
	var item_product_id = window.calculation_numbers["product_id"][product_code];
	var item_product_name = window.products_data[item_product_id]["name"];
	var cost_unit = window.products_data[item_product_id]["cost"];
	var quantity = window.project_calculation["number_of_planks"];


	// add item into bill
	var item_number = add_bill_item();
	fill_bill_item(item_number, item_product_id,item_product_name,quantity,"each",cost_unit);
};


add_fasteners = function() {
	
	// get item info
	var item_product_id = window.project_calculation['fasteners_type'];
	var item_name = window.products_data[item_product_id]["name"];
	var cost_unit = window.products_data[item_product_id]["cost"];
	var quantity = window.project_calculation["number_of_fasteners"];

	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, item_product_id,item_name,quantity,"each",cost_unit);
};

add_sealant = function() {
	
	var amount_of_sealant = window.project_calculation["amount_of_sealant"];
	var amount_of_sealant_in_tube = window.calculation_numbers["amount_of_sealant_in_tube"];
	var min_amount_of_sealant_for_using_tubes = window.calculation_numbers["min_amount_of_sealant_for_using_tubes"];
	
	if (amount_of_sealant > min_amount_of_sealant_for_using_tubes) {
		var sealant_per_unit = amount_of_sealant_in_tube;
		var sealant_product_id = 'PU';
	}
	else {
		sealant_product_id = 'PU ml';
		sealant_per_unit = 1;
	}
	
	// get item info
	var sealant_product_name = window.products_data[sealant_product_id]["name"];
	var cost_unit = window.products_data[sealant_product_id]["cost"];
	var units = window.products_data[sealant_product_id]["unit"];
	var items_quantity = Math.ceil(amount_of_sealant / sealant_per_unit);
	
	
	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, sealant_product_id,sealant_product_name,items_quantity,units,cost_unit);
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