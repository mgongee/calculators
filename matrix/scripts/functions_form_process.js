/**
 * There are functions that related to processing changes in the created form
 */

/*********** Code for Create/Edit page ************/

// --------------- Walls

/**
 * Adds new wall to project
 */
add_wall = function(){
	
	var new_wall_field = $("#template_addwall tbody").html().toString();

	var max_field_number = 0;

	/* Calculate number of walls that already added */
	$("#add_walls_target").find("input.wall_height").each(function(){
		var field_number = parseInt($(this).attr("num"));

		if (field_number > max_field_number) {
			max_field_number = field_number;
		}
	});

	var wall_number = +max_field_number + 1;

	var new_wall_field = new_wall_field
		.replace(new RegExp("_LABEL_",'g'), wall_number)
		.replace(new RegExp("_STEP_",'g'),"step2")
		.replace(new RegExp("_FIELDNAME_",'g'),"walls")
		.replace(new RegExp("_ID_",'g'),wall_number)
		.replace(new RegExp("_HEIGHT_",'g'),0)
		.replace(new RegExp("_LENGTH_",'g'),0)
		.replace(new RegExp("_SIZE_",'g'),0)
		.replace(new RegExp("_PUTTY_",'g'),0)
		.replace(new RegExp("_SEALANT_",'g'),0)
		.replace(new RegExp("_FRAME_SPACING_",'g'),0)
		.replace(new RegExp("_CONTROL_JOINTS_",'g'),0)
		.replace(new RegExp("_FASTENER_TYPE_",'g'),0)
		.replace(new RegExp("_FASTENERS_",'g'),0)
		.replace(new RegExp("_PAPER_TYPE_",'g'),"")
		.replace(new RegExp("_PAPER_",'g'),0);

	$("#add_walls_target tbody.walls").append(new_wall_field);
	console.log("new_wall_field", wall_number);
	
	var $sheet_sizes_list = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[sheet_size\\]');
	var $orientation_list = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[orientation\\]');
	var $frame_spacing_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[frame_spacing\\]'); // readonly
	var $height_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[height\\]');
	var $length_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[length\\]');
	var $size_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[size\\]');
	
	//when wall added, user must set sheet_size at first
	$sheet_sizes_list.show();
	
	var sheet_size_options = get_wall_list_options('sheet_size', wall_number);
	fill_list("step2[walls][" + wall_number+ "][sheet_size]" , sheet_size_options,false);	
	
	
	// other elements will be shown when the application, sheet_size, etc specified
	$frame_spacing_input.hide();
	$orientation_list.hide();
	$height_input.hide();
	$length_input.hide();
	$size_input.hide();
			
	
	var inputs = {
		'sheet_sizes_list':					$sheet_sizes_list,
		'orientation_list':					$orientation_list,
		'frame_spacing_input':				$frame_spacing_input,
		'height_input':						$height_input,
		'length_input':						$length_input,
		'size_input':						$size_input,
	// hidden inputs - for storing calculated values only
		'fastener_type_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[fastener_type\\]'),
		'perforated_paper_tape_input':		$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[perforated_paper_tape\\]'),
		'no_of_fasteners_per_sheet_input':	$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[no_of_fasteners_per_sheet\\]'),
		'amount_of_putty_input':			$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_putty\\]'),
		'amount_of_sealant_input':			$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_sealant\\]'),
		'amount_of_tape_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_tape\\]'),
		'control_joints_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[control_joints\\]')
	};
	
	$sheet_sizes_list.on('change',function(){wall_change_handler($(this),wall_number,inputs);});
	/*
	// due to formwizard bug, th validation must be applied only after users goes to step2
	$("#calcForm").bind("step_shown", function(event, data){
		if (data.currentStep == 'step2') {
			// add validation
			$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[application\\]').rules( "add", {
				required: true
			});
		}
	});
*/
};


wall_change_handler = function($el, wall_number,inputs){
	if ($el.val() != "") {		
		inputs['orientation_list'].show();	
		inputs['height_input'].show();
		inputs['length_input'].show();
		inputs['size_input'].show();

		/*calculate orientation options */
		var orientation_options = get_wall_list_options('orientation', wall_number);

		if (orientation_options !== false) {
			inputs['orientation_list'].show();
			fill_list("step2[walls][" + wall_number+ "][orientation]" , orientation_options,false);	
		}
		else {
			alert('This variant is unapplicable');
		}

		/*calculate frame_spacing */
		inputs['frame_spacing_input'].show();
		inputs['frame_spacing_input'].val(calculate_wall_value('frame_spacing',wall_number));

		/*calculate fastener_type */
		inputs['fastener_type_input'].val(calculate_wall_value('fastener_type',wall_number));

		/*calculate perforated_paper_tape */
		inputs['perforated_paper_tape_input'].val(calculate_wall_value('perforated_paper_tape',wall_number));

		/*calculate no_of_fasteners_per_sheet */
		inputs['no_of_fasteners_per_sheet_input'].val(calculate_wall_value('no_of_fasteners_per_sheet',wall_number));
		
		inputs['orientation_list'].on('change',function(){
			inputs['no_of_fasteners_per_sheet_input'].val(calculate_wall_value('no_of_fasteners_per_sheet',wall_number));
		});

		/*calculate values based on size */

		inputs['height_input'].on('keyup',function(){
			update_wall_value(inputs['size_input'],'size',wall_number);

			// order is important!
			update_wall_value(inputs['control_joints_input'],'control_joints',wall_number);
			update_wall_value(inputs['amount_of_tape_input'],'amount_of_tape',wall_number);
			update_wall_value(inputs['amount_of_putty_input'],'amount_of_putty',wall_number);
			update_wall_value(inputs['amount_of_sealant_input'],'amount_of_sealant',wall_number);

		});

		inputs['length_input'].on('keyup',function(){
			update_wall_value(inputs['size_input'],'size',wall_number);

			// order is important!
			update_wall_value(inputs['control_joints_input'],'control_joints',wall_number);
			update_wall_value(inputs['amount_of_tape_input'],'amount_of_tape',wall_number);
			update_wall_value(inputs['amount_of_putty_input'],'amount_of_putty',wall_number);
			update_wall_value(inputs['amount_of_sealant_input'],'amount_of_sealant',wall_number);
		});

		inputs['size_input'].on('keyup',function(){
			update_wall_value(inputs['height_input'],'height',wall_number);				

			// order is important!
			update_wall_value(inputs['control_joints_input'],'control_joints',wall_number);
			update_wall_value(inputs['amount_of_tape_input'],'amount_of_tape',wall_number);
			update_wall_value(inputs['amount_of_putty_input'],'amount_of_putty',wall_number);
			update_wall_value(inputs['amount_of_sealant_input'],'amount_of_sealant',wall_number);
		});
	}
	else {
		inputs['orientation_list'].hide();
		inputs['frame_spacing_input'].hide();
		inputs['height_input'].hide();
		inputs['length_input'].hide();
		inputs['size_input'].hide();
	}
};

get_wall_list_options = function(list_name, wall_number) {
	return window.list_option_calculation_rules[list_name](wall_number);
};

get_wall_value = function(value_name, wall_number) {	
		return window.wall_value_getters[value_name](wall_number);
};

calculate_wall_value = function(value_name, wall_number) {	
		return window.wall_calculation_rules[value_name](wall_number);
};

update_wall_value = function($input, value_name, wall_number) {	
	var new_value = calculate_wall_value(value_name,wall_number);
	if (new_value) {
		$input.val(new_value);
	}
};

/**
 * Load saved walls to project
 * @param {Array} step_data
 */
load_walls = function(step_data){

	if (typeof step_data === 'undefined') {
		alert("Project data is corrupt: failed to loaded walls");
		return false;
	}
	var walls = step_data["walls"];
	
	for (var wall_number in walls) {
		
		var wall = walls[wall_number];

		var new_wall_field = $("#template_addwall tbody").html().toString();

		new_wall_field = new_wall_field
			.replace(new RegExp("_LABEL_",'g'), wall_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"walls")
			.replace(new RegExp("_ID_",'g'),wall_number)
			.replace(new RegExp("_HEIGHT_",'g'),wall["height"])
			.replace(new RegExp("_LENGTH_",'g'),wall["length"])
			.replace(new RegExp("_SIZE_",'g'),wall["size"])
			.replace(new RegExp("_PUTTY_",'g'),wall["amount_of_putty"])
			.replace(new RegExp("_SEALANT_",'g'),wall["amount_of_sealant"])
			.replace(new RegExp("_FRAME_SPACING_",'g'),wall["frame_spacing"])
			.replace(new RegExp("_CONTROL_JOINTS_",'g'),wall["control_joints"])
			.replace(new RegExp("_FASTENER_TYPE_",'g'),wall["fastener_type"])
			.replace(new RegExp("_FASTENERS_",'g'),wall["no_of_fasteners_per_sheet"])
			.replace(new RegExp("_PAPER_TYPE_",'g'),wall["perforated_paper_tape"])
			.replace(new RegExp("_PAPER_",'g'),wall["amount_of_tape"]);

		$("#add_walls_target tbody.walls").append(new_wall_field);

		load_openings(step_data, wall_number);
		
		var $sheet_sizes_list = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[sheet_size\\]');
		var $orientation_list = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[orientation\\]');
		var $frame_spacing_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[frame_spacing\\]'); // readonly
		var $height_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[height\\]');
		var $length_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[length\\]');
		var $size_input = $('#step2\\[walls\\]\\[' + wall_number + '\\]\\[size\\]');

		//when wall added, user must set sheet_size at first
		$sheet_sizes_list.show();

		var sheet_size_options = get_wall_list_options('sheet_size', wall_number);
		fill_list("step2[walls][" + wall_number+ "][sheet_size]" , sheet_size_options,wall["sheet_size"]);	

		var orientation_options = get_wall_list_options('orientation', wall_number);
		fill_list("step2[walls][" + wall_number+ "][orientation]" , orientation_options,wall["orientation"]);	
	
		var inputs = {
			'sheet_sizes_list':					$sheet_sizes_list,
			'orientation_list':					$orientation_list,
			'frame_spacing_input':				$frame_spacing_input,
			'height_input':						$height_input,
			'length_input':						$length_input,
			'size_input':						$size_input,
		// hidden inputs - for storing calculated values only
			'fastener_type_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[fastener_type\\]'),
			'perforated_paper_tape_input':		$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[perforated_paper_tape\\]'),
			'no_of_fasteners_per_sheet_input':	$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[no_of_fasteners_per_sheet\\]'),
			'amount_of_putty_input':			$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_putty\\]'),
			'amount_of_sealant_input':			$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_sealant\\]'),
			'amount_of_tape_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[amount_of_tape\\]'),
			'control_joints_input':				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[control_joints\\]')
		};


		wall_change_handler($sheet_sizes_list,wall_number,inputs);
	
		$sheet_sizes_list.on('change',function(){wall_change_handler($(this),wall_number,inputs);});
	}
};

/**
 * Deletes wall from project
 * @param {jQuery selection} $wall_button button that was clicked
 */
delete_wall = function($wall_button){
   $wall_button.parent().parent().remove();
};


//------------------------- Openings 


/**
 * Adds new opening to wall
 */
add_opening_to_wall = function($this){
	var wall_number = $this.attr("number");
	
	var opening_width = $("#add_opening\\[" + wall_number + "\\]\\[width\\]").last().val();
	var opening_height = $("#add_opening\\[" + wall_number + "\\]\\[height\\]").last().val();
	var opening_size = opening_width * opening_height * 0.000001;
	opening_size = opening_size.toFixed(2);
	
	if ((opening_width > 99) && (opening_height > 99) && (opening_size > 0)) {
		var new_opening_field = $("#template_addopening tbody").html().toString();
		var max_field_number = 0;

		/* Calculate number of openings that already added */
		$("#add_openings_target\\[" + wall_number + "\\]").find("input.opening_width").each(function(){
			var field_number = parseInt($(this).attr("number2"));

			if (field_number > max_field_number) {
				max_field_number = field_number;
			}
		});

		var field_number = +max_field_number + 1;

		var new_opening_field = new_opening_field
			.replace(new RegExp("_LABEL_",'g'), field_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"openings")
			.replace(new RegExp("_ID_",'g'),wall_number)
			.replace(new RegExp("_ID2_",'g'),field_number)
			.replace(new RegExp("_WIDTH_",'g'),opening_width)
			.replace(new RegExp("_HEIGHT_",'g'),opening_height)
			.replace(new RegExp("_SIZE_",'g'),opening_size);
		$("#add_openings_target\\[" + wall_number + "\\] tbody.openings").append(new_opening_field);

	}
	else {
		alert('Please check opening size. Minimum width and height are 100 mm');
	}
	
};
 
/**
 * Deletes opening from project
 */
delete_opening = function($opening_button){
   $opening_button.parent().parent().remove();
};
 


/**
 * Calculates the opening size
 * @param {jQuery selection} $this "width" or "height" field
 * @param {String} mode tells what fiels was changed - "width" or "heigth"
 */
calculate_opening_size = function($this,mode){
	
	var field_name = $this.attr("id").toString();
	if (mode === "width") {
		var another_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[height]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		var size_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	else if (mode === "height") {
		another_field_name = field_name.replace(new RegExp("\\[height\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		size_field_name = field_name.replace(new RegExp("\\[height\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	
	
	var this_dimension = parseInt($this.val());
	var another_dimension = parseInt($("#" + another_field_name).filter(":visible").last().val()); // fuck the jquery UI dialog!!
	
	if (is_int(this_dimension) && is_int(another_dimension)) {
		var size = this_dimension * another_dimension;
		
		// note that dimensions are fillen in millimeters, and wall is filles in square meters,
		// so the square must be divided by 1000*1000
		size = size * 0.000001;
		
		size = +size.toFixed(2);
		
		$("#" + size_field_name).filter(":visible").last().val(size); // fuck the jquery UI dialog!!
	}
	

};


/**
 * Calculates total openings area 
 */
calculate_total_openings_area = function($this, clone){
	var number = $this.attr("number");
	var new_size = 0;
	
	$("#add_openings_target\\[" + number + "\\]").find(".opening_size").filter(":visible").each(function(){
		var part_size = $(this).val();
		if (is_float(part_size)) {
			new_size += parseFloat(part_size);
		}
	});
	new_size = new_size.toFixed(2);
	var $field = $(clone).find(".total_opening_area");
	$field.attr("value",new_size);
};



/**
 * Updates opening width or height accordingly to new size
 * note that this function is designed to match both the size fields in 'Add opening' zone and in 'Added openings' zone
 * @param {jQuery selection} $this "size" field
 */
update_opening_dimensions = function($this){
	var field_name = $this.attr("id").toString();
	var size = $this.val();
		
	// note that dimensions are fillen in millimeters, and wall is filles in square meters,
	// so the square must be multiplied by 1000*1000
	size = size * 1000000;
	
	var width_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	var height_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[height]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	
	var height = $("#" + height_field_name).filter(":visible").last().val(); // fuck the Jquery UI dialog
	var width = $("#" + width_field_name).filter(":visible").last().val(); // for its DOM elements duplication

	if (is_int(height) && is_int(width)) {
		if (height > 0) {
			var new_width = Math.round(size / height);
			$("#" + width_field_name).val(new_width);
		} 
		else if (width > 0) {
			var new_height = Math.round(size / width);
			$("#" + height_field_name).filter(":visible").last().val(new_height); // fuck the Jquery UI dialog
		} 
	}
};


/**
 * Load saved openings to project
 * @param {Array} step_data
 */
load_openings = function(step_data, wall_number){
	
	// if no openings present
	if (typeof step_data["openings"] == 'undefined') {
		return false;
	}
	
	var openings = step_data["openings"][wall_number];
	
	for (var opening_number in openings) {
		var opening = openings[opening_number];

		var new_opening_field = $("#template_addopening tbody").html().toString();

		var new_opening_field = new_opening_field
			.replace(new RegExp("_LABEL_",'g'), opening_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"openings")
			.replace(new RegExp("_ID_",'g'),wall_number)
			.replace(new RegExp("_ID2_",'g'),opening_number)
			.replace(new RegExp("_WIDTH_",'g'),opening['width'])
			.replace(new RegExp("_HEIGHT_",'g'),opening['height'])
			.replace(new RegExp("_SIZE_",'g'),opening['size']);
		$("#add_openings_target\\[" + wall_number + "\\] tbody.openings").append(new_opening_field);
	}
	
	$("#step2\\[total_opening_area\\]\\[" + wall_number + "\\]").attr("value",
		step_data["total_opening_area"][wall_number]
	);
};


/*********** Code for Estimate page ************/


/**
 * Adds new item to bill
 */
add_bill_item = function(){
	var max_field_number = 0;
	var new_bill_item = $("#template_add_bill_item tbody").html().toString();
	
	/* Calculate number of items that already added */
	$("#bill_of_quantities").find("input.bill_item_id").each(function(){
		var field_number = parseInt($(this).attr("number"));
		
		if (field_number > max_field_number) {
			max_field_number = field_number;
		}
	});
	
	var field_number = +max_field_number + 1;
	
	var new_bill_item = new_bill_item.replace(new RegExp("_ID_",'g'),field_number);
		
	$("#bill_of_quantities tbody").append(new_bill_item);
	return field_number;
};



/**
 * Removes item from bill
 * @param {jQuery selection} $bill_item_delete_button button that was clicked
 */
delete_bill_item = function($bill_item_delete_button){
   $bill_item_delete_button.parent().parent().remove();
};


	