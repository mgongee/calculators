/**
 * There are functions that related to project estimation
 */

estimate_project = function() {
	// get the stored project parameters
	for (var field_name in estimation_elements) {

		var field_label = estimation_elements[field_name]["label"];
		var field_value = get_saved_field_value(field_name);
		var field_units = estimation_elements[field_name]["units"];
		
		var estimation_row = "<tr><td>" + field_label + "</td><td>" + field_value + "</td><td>" + field_units +"</td></tr>";
		$("table#estimation_values tbody").append(estimation_row);
		estimation_elements[field_name]["value"] = field_value;
		
	}
	
	// calculate total product estimation
	var total_area_size = +estimation_elements['total_area_size']['value'];
	var waste = +estimation_elements['waste']['value'];
	var product_estimation = total_area_size * ((100 + waste)/100);
	
	$("#product_estimation").html(Math.round(product_estimation,2));
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
		
		total_cost += parseFloat(quantity * cost);
	});
	
	if (!isNaN(total_cost) && (total_cost > 0)) {
		if (!isNaN(total_area_estimation) && (total_area_estimation > 0)) {
			var total_cost_per_sqm = Math.round(total_cost / total_area_estimation,2);
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

create_bill_list = function (){
	
	add_product();
	add_fasteners();
	add_epoxy();
	add_adhesive();
};


fill_bill_item = function(item_number, id_number, item_name, quantity, units, cost_unit){
	$("#bill\\[" + item_number + "\\]\\[id_number\\]").val(id_number);
	$("#bill\\[" + item_number + "\\]\\[description\\]").val(item_name);
	$("#bill\\[" + item_number + "\\]\\[quantity\\]").val(quantity);
	$("#bill\\[" + item_number + "\\]\\[unit\\]").val(units);
	$("#bill\\[" + item_number + "\\]\\[cost_unit\\]").val(cost_unit);
};

add_product = function() {
	
	// get product info
	var product_name = get_saved_field_value("product");	
	var type_of_frame = get_saved_field_raw_value("type_of_frame");
	var type_of_frame_code = window.type_of_frame_codes[type_of_frame];
	var sheet_size = get_saved_field_value("sheet_size");
	var full_product_name = product_name + " (" + sheet_size + ", " + type_of_frame_code + ")";	
	var quantity = get_saved_field_value("number_of_sheets");
	var units = "each";//var units = get_saved_field_value("number_of_sheets_units");
	var id_number = "HF16";

	var cost_unit = 555;
	
	// add item into bill
	var item_number = add_bill_item();
	fill_bill_item(item_number, id_number,full_product_name,quantity,units,cost_unit);
};


add_fasteners = function() {
	
	// get item info
	var id_number = "3243";
	var item_name = "HardieDrive Screws 8x32";
	var quantity = get_saved_field_value("number_of_fasteners");

	var cost_unit = 21;
	
	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, id_number,item_name,quantity,"each",cost_unit);
};

add_epoxy = function() {
	
	// get item info
	var id_number = "E-12";
	var item_name = "Epoxy";
	var quantity = get_saved_field_value("amount_of_epoxy");
	var units = get_saved_field_value("amount_of_epoxy_units");
	
	var cost_unit = 21;
	
	// add item into bill
	var item_number = add_bill_item();
	
	fill_bill_item(item_number, id_number,item_name,quantity,units,cost_unit);
};

add_adhesive = function() {
	
	// get item info
	var id_number = "A-vs2";
	var item_name = "Construction Adhesive";
	var quantity = get_saved_field_value("amount_of_constr_adhesive");
	var units = get_saved_field_value("amount_of_constr_adhesive_units");
	
	var cost_unit = 21;
	
	// add item into bill
	var item_number = add_bill_item();
	fill_bill_item(item_number, id_number,item_name,quantity,units,cost_unit);
};

