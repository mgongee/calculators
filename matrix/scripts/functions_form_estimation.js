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
	
	var total_wall_area = window.project_calculation['total_wall_area'];
	$("#estimation_value__total_wall_area").html(total_wall_area + 
		'<input type="hidden" id="total_wall_area" name="total_wall_area" value="' + total_wall_area + '">');
	
	var total_control_joints = window.project_calculation['total_control_joints'];
	$("#estimation_value__total_control_joints").html(total_control_joints + 
		'<input type="hidden" id="total_control_joints" name="total_control_joints" value="' + total_control_joints + '">');
		
	var total_opening_area = window.project_calculation['total_opening_area'];
	$("#estimation_value__total_opening_area").html(total_opening_area + 
		'<input type="hidden" id="total_opening_area" name="total_opening_area" value="' + total_opening_area + '">');
		
	var total_product_estimation = window.project_calculation['total_product_estimation'];
	$("#estimation_value__total_product_estimation").html(total_product_estimation +
		'<input type="hidden" id="total_product_estimation" name="total_product_estimation" value="' + total_product_estimation + '">');
	
};

calculate_labour_rate = function() {
	// nothing to do there 
}

calculate_product_quantity = function(wall) {
	var sheet_length = window.calculation_numbers['sheet_length'][wall["sheet_size"]];
	var sheet_width = window.calculation_numbers['sheet_width'][wall["sheet_size"]];
	
	if (wall['orientation'] == 'h') {
		var number_of_rows = Math.ceil(wall['length'] / sheet_length);
		var number_of_columns = Math.ceil(wall['length'] / sheet_width);
	}
	else {
		number_of_rows = Math.ceil(wall['length'] / sheet_width);
		number_of_columns = Math.ceil(wall['length'] / sheet_length );
	}
	return number_of_rows * number_of_columns;
};

calculate_fasteners_quantity = function(sheets_quantity, wall) {
	var no_of_fasteners_per_sheet = wall["no_of_fasteners_per_sheet"];
	return sheets_quantity * no_of_fasteners_per_sheet;
};

calculate_fasteners_items = function(fasteners) {
	var fasteners_items = [];
	for (var i in fasteners) {
		if (fasteners[i] !== false) {
			var fastener_type = fasteners[i]['item_product_id'];
			var fastener_quantity = fasteners[i]['quantity'];

			// get fasteners possible items
			var fastener_packs = window.calculation_numbers["product_amount_to_id"]['fastener'][fastener_type];

			// find largest suitable pack
			var max_pack_size = 0; 
			var max_pack = '';
			var second_pack_size = 0;
			var second_pack = '';

			for (var pack_size in fastener_packs) {
				var size = parseFloat(pack_size);
				if (size > max_pack_size) {
					max_pack_size = size;
					max_pack = pack_size;
				}

			}

			// find second suitable pack
			for (var pack_size in fastener_packs) {
				var size = parseFloat(pack_size);
				if ((size > second_pack_size) && (size < max_pack_size)){
					second_pack_size = size;
					second_pack = pack_size;
				}
			}

			// calculate amount of fasteners in largest suitable pack
			var largest_packs_number = Math.floor(fastener_quantity / max_pack_size);

			if (largest_packs_number > 0) {
				var roundup = fastener_quantity - (largest_packs_number * max_pack_size); 
				
				if ((max_pack_size / roundup ) > 9) {
					largest_packs_number++;
				}
				
				// add largest pack of fasteners
				var fastener_product_id = fastener_packs[max_pack];
				var fastener_product_name = window.products_data[fastener_product_id]['name'];
				var pack_units = window.products_data[fastener_product_id]['unit'];
				var pack_cost = window.products_data[fastener_product_id]['cost'];

				fasteners_items.push({
					'item_product_id': fastener_product_id,
					'item_product_name': fastener_product_name,
					'cost_unit': pack_cost,
					'units': pack_units,
					'quantity': largest_packs_number
				});
			}


			var remains = fastener_quantity - (largest_packs_number * max_pack_size);

			// calculate rest of fasteners in second suitable pack
			var second_packs_number = Math.ceil(remains / second_pack_size);
			if (second_packs_number > 0) {
				// add second pack of fasteners
				var fastener_product_id = fastener_packs[second_pack];
				var fastener_product_name = window.products_data[fastener_product_id]['name'];
				var pack_units = window.products_data[fastener_product_id]['unit'];
				var pack_cost = window.products_data[fastener_product_id]['cost'];

				fasteners_items.push({
					'item_product_id': fastener_product_id,
					'item_product_name': fastener_product_name,
					'cost_unit': pack_cost,
					'units': pack_units,
					'quantity': second_packs_number
				});
			}
		}
	}

	return fasteners_items;
};
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
 * Creates the initial bill when the page is loaded
 */
create_bill_list = function (){
	add_items(); // boards and fasteners
	add_paper();
	add_putty();
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

compact_items_list = function(items) {
	for (var index = 0; index < items.length; ++index) {	
		for (var index2 = 0; index2 < items.length; ++index2) {
			if ((index !== index2) && (items[index2] !== false)) {
				if (items[index]['item_product_id'] === items[index2]['item_product_id']) {
					var item_to_compact = items.splice(index2, 1);
					item_to_compact = item_to_compact[0];
					items[index]['quantity'] += parseFloat(item_to_compact['quantity']);					
					items[index2] = false;
				}
			}
		}
	}
	return items;
};

/**
 * Add boards and fasteners in bill of quantities
 */
add_items = function() {
	
	// get product info
	var product = get_saved_field_raw_value("product");
	var walls = get_saved_field_raw_value("walls");	
	
	var products = [];
	var fasteners = [];
	for (var wall_number in walls) {
		// get item info
		var sheet_size = walls[wall_number]['sheet_size'];
		var board_product_id = window.calculation_numbers["product_id"][product][sheet_size];
		var board_product_name = window.products_data[board_product_id]["name"];
		var sheets_quantity = calculate_product_quantity(walls[wall_number]);
		
		products.push({
			'item_product_id': board_product_id,
			'item_product_name': board_product_name,
			'cost_unit': window.products_data[board_product_id]["cost"],
			'units': "each",
			'quantity': sheets_quantity
		});
		
		var fastener_type = walls[wall_number]['fastener_type'];
		var fasteners_quantity = calculate_fasteners_quantity(sheets_quantity, walls[wall_number]);
		
		fasteners.push({
			'item_product_id': fastener_type,
			'item_product_name': fastener_type,
			'cost_unit': 1,
			'units': "each",
			'quantity': fasteners_quantity
		});
	}
	
	products = compact_items_list(products);
	fasteners = compact_items_list(fasteners);
	fasteners = calculate_fasteners_items(fasteners);

	for (var i in products) {
		if (products[i] !== false) {
			// add item into bill
			var item_number = add_bill_item();
			fill_bill_item(item_number, 
				products[i]['item_product_id'],
				products[i]['item_product_name'],
				products[i]['quantity'],
				products[i]['units'],
				products[i]['cost_unit']
			);
		}
	}
	
	
	for (var i in fasteners) {
		if (fasteners[i] !== false) {
			// add item into bill
			var item_number = add_bill_item();
			fill_bill_item(item_number, 
				fasteners[i]['item_product_id'],
				fasteners[i]['item_product_name'],
				fasteners[i]['quantity'],
				fasteners[i]['units'],
				fasteners[i]['cost_unit']
			);
		}
	}

};


/**
 * Add putty tape in bill of quantities
 */
add_putty = function() {
	
	var walls = get_saved_field_raw_value("walls");	
	
	var putties = []; // :)
	for (var wall_number in walls) {
		// get item info
		var amount_of_putty = parseFloat(walls[wall_number]['amount_of_putty']); // in kG
		
		var putty_product_id = 305470;
		var putty_product_name = window.products_data[putty_product_id]["name"];
		
		putties.push({
			'item_product_id': putty_product_id,
			'item_product_name': putty_product_name,
			'cost_unit': window.products_data[putty_product_id]["cost"],
			'units': window.products_data[putty_product_id]["unit"],
			'quantity': amount_of_putty
		});
		
	}
	
	putties = compact_items_list(putties);
	
	for (var i in putties) {
		if (putties[i] !== false) {
			// add item into bill
			
			var quantity = putties[i]['quantity'];
			var quantity_in_pails = Math.ceil( quantity / window.calculation_numbers['amount_of_putty_per_pail']);
		
			console.log(" quantity_in_pails",  quantity_in_pails, quantity);
			var item_number = add_bill_item();
			fill_bill_item(item_number, 
				putties[i]['item_product_id'],
				putties[i]['item_product_name'],
				quantity_in_pails,
				putties[i]['units'],
				putties[i]['cost_unit']
			);
		}
	}
	
};


/**
 * Add sealant in bill of quantities
 */
add_sealant = function() {
	var walls = get_saved_field_raw_value("walls");	
	console.log('comp walls', walls);
	var sealants = []; // :)
	for (var wall_number in walls) {
		// get item info
		var amount_of_sealant = parseFloat(walls[wall_number]['amount_of_sealant']); // in mL
		
		if (amount_of_sealant > 0) {
			var sealant_product_id = 'PU';
			var sealant_product_name = window.products_data[sealant_product_id]["name"];

			sealants.push({
				'item_product_id': sealant_product_id,
				'item_product_name': sealant_product_name,
				'cost_unit': window.products_data[sealant_product_id]["cost"],
				'units': window.products_data[sealant_product_id]["unit"],
				'quantity': amount_of_sealant
			});
		}
		
	}
	console.log('non comp sealants', sealants);
	sealants = compact_items_list(sealants);
	console.log('comp sealants', sealants);
	for (var i in sealants) {
		if (sealants[i] !== false) {
			// add item into bill
			
			var quantity = sealants[i]['quantity'];
			var quantity_in_tubes = Math.ceil( quantity / window.calculation_numbers['amount_of_sealant_in_tube']);
		
			console.log(" quantity_in_tubes",  quantity_in_tubes, quantity);
			var item_number = add_bill_item();
			fill_bill_item(item_number, 
				sealants[i]['item_product_id'],
				sealants[i]['item_product_name'],
				quantity_in_tubes,
				sealants[i]['units'],
				sealants[i]['cost_unit']
			);
		}
	}
	
};


/**
 * Add paper tape in bill of quantities
 */
add_paper = function() {
	
	// get product info
	var product = get_saved_field_raw_value("product");
	//var type_of_frame = get_saved_field_value("type_of_frame");
	var walls = get_saved_field_raw_value("walls");	
	
	var papers = [];
	for (var wall_number in walls) {
		// get item info
		var amount_of_paper = walls[wall_number]['amount_of_tape']; // in mm
		amount_of_paper = amount_of_paper * 0.001; // in meters
		
		var paper_product_id = 305440;
		var paper_product_name = window.products_data[paper_product_id]["name"];
		
		papers.push({
			'item_product_id': paper_product_id,
			'item_product_name': paper_product_name,
			'cost_unit': window.products_data[paper_product_id]["cost"],
			'units': window.products_data[paper_product_id]["unit"],
			'quantity': amount_of_paper
		});
		
	}
	
	papers = compact_items_list(papers);
	
	for (var i in papers) {
		if (papers[i] !== false) {
			// add item into bill
			
			var quantity = papers[i]['quantity'];
			var quantity_in_rolls = Math.ceil( quantity / window.calculation_numbers['amount_of_paper_per_roll']);
		
			console.log(" quantity_in_rolls",  quantity_in_rolls, quantity);
			var item_number = add_bill_item();
			fill_bill_item(item_number, 
				papers[i]['item_product_id'],
				papers[i]['item_product_name'],
				quantity_in_rolls,
				papers[i]['units'],
				papers[i]['cost_unit']
			);
		}
	}
	
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