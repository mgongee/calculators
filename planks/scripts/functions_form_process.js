/**
 * There are functions that related to processing changes in the created form
 */

/*********** Code for Create/Edit page ************/

// --------------- Walls

/**
 * Adds new wall to project
 */
add_wall = function(){
	var wall_width = $("#add_wall\\[width\\]").val();
	var wall_length = $("#add_wall\\[length\\]").val();
	var wall_size = wall_width * wall_length * 0.000001;
	wall_size = wall_size.toFixed(2);
	
	if ((wall_width > 99) && (wall_length > 99) && (wall_size > 0)) {
		var new_wall_field = $("#template_addwall tbody").html().toString();

		var max_field_number = 0;

		/* Calculate number of walls that already added */
		$("#add_walls_target").find("input.wall_width").each(function(){
			var field_number = parseInt($(this).attr("number"));

			if (field_number > max_field_number) {
				max_field_number = field_number;
			}
		});

		var field_number = +max_field_number + 1;

		var new_wall_field = new_wall_field
			.replace(new RegExp("_LABEL_",'g'), field_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"walls")
			.replace(new RegExp("_ID_",'g'),field_number)
			.replace(new RegExp("_WIDTH_",'g'),wall_width)
			.replace(new RegExp("_LENGTH_",'g'),wall_length)
			.replace(new RegExp("_SIZE_",'g'),wall_size);
		$("#add_walls_target tbody.walls").append(new_wall_field);

		// add validation
		$('#step2\\[walls\\]\\[' + field_number + '\\]\\[width\\]').rules( "add", {
			required: true,
			min: 100,
		});
		$('#step2\\[walls\\]\\[' + field_number + '\\]\\[length\\]').rules( "add", {
			required: true,
			min: 100,
		});
		$('#step2\\[walls\\]\\[' + field_number + '\\]\\[size\\]').rules( "add", {
			required: true,
			min: 0.01,
		});
	}
	else {
		alert('Please check wall size. Minimum width and length are 100 mm');
	}
	
};

/**
 * Load saved walls to project
 * @param {Array} step_data
 */
load_walls = function(step_data){

	var walls = step_data["walls"];
	for (var wall_number in walls) {
		
		var wall = walls[wall_number];

		var new_wall_field = $("#template_addwall tbody").html().toString();

		var new_wall_field = new_wall_field
			.replace(new RegExp("_LABEL_",'g'),wall_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"walls")
			.replace(new RegExp("_ID_",'g'),wall_number)
			.replace(new RegExp("_WIDTH_",'g'),wall["width"])
			.replace(new RegExp("_LENGTH_",'g'),wall["length"])
			.replace(new RegExp("_SIZE_",'g'),wall["size"]);
		$("#add_walls_target tbody.walls").append(new_wall_field);
		
		load_openings(step_data, wall_number);
		
		// due to formwizard bug, th validation must be applied only after users goes to step2
		$("#calcForm").bind("step_shown", function(event, data){
			if (data.currentStep == 'step2') {
				// add validation
				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[width\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[length\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step2\\[walls\\]\\[' + wall_number + '\\]\\[size\\]').rules( "add", {
					required: true,
					min: 0.01,
				});
			}
		});
		
	}
console.log('test');
	$("#step2\\[total_wall_area\\]").val(step_data["total_wall_area"]);
	

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


/**
 * Load saved gables to project
 * @param {Array} step_data
 */
load_gables = function(step_data){

	// if no gables present
	if (typeof step_data["gables"] == 'undefined') {
		return false;
	}
	
	var gables = step_data["gables"];
	for (var gable_number in gables) {
		var gable = gables[gable_number];

		var new_gable_field = $("#template_addgable tbody").html().toString();

		var new_gable_field = new_gable_field
			.replace(new RegExp("_LABEL_",'g'),gable_number)
			.replace(new RegExp("_STEP_",'g'),"step3")
			.replace(new RegExp("_FIELDNAME_",'g'),"gables")
			.replace(new RegExp("_ID_",'g'),gable_number)
			.replace(new RegExp("_BASE_",'g'),gable["base"])
			.replace(new RegExp("_HEIGHT_",'g'),gable["height"])
			.replace(new RegExp("_SIZE_",'g'),gable["size"]);
		$("#add_gables_target tbody.gables").append(new_gable_field);
		
		
		// due to formwizard bug, th validation must be applied only after users goes to step2
		$("#calcForm").bind("step_shown", function(event, data){
			if (data.currentStep == 'step3') {
				// add validation
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[base\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[height\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[size\\]').rules( "add", {
					required: true,
					min: 0.01,
				});
			}
		});
		
	}

	$("#step2\\[total_gable_area\\]").val(step_data["total_gable_area"]);
	

};


/**
 * Deletes wall from project
 * @param {jQuery selection} $wall_button button that was clicked
 */
delete_wall = function($wall_button){
   $wall_button.parent().parent().remove();
};

/**
 * Calculates the wall size
 * @param {jQuery selection} $this "width" or "length" field
 * @param {String} mode tells what fiels was changed - "width" or "length"
 */
calculate_wall_size = function($this,mode){
	var field_name = $this.attr("id").toString();
	
	if (mode === "width") {
		var another_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[length]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		var size_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	else if (mode === "length") {
		another_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		size_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	
	var this_dimension = parseInt($this.val());
	var another_dimension = parseInt($("#" + another_field_name).val());
	
	if (is_int(this_dimension) && is_int(another_dimension)) {
		var size = this_dimension * another_dimension;
		
		// note that dimensions are fillen in millimeters, and wall is filles in square meters,
		// so the square must be divided by 1000*1000
		size = size * 0.000001;
		
		size = +size.toFixed(2);
		
		$("#" + size_field_name).val(size);
	}
};


/**
 * Updates wall width or length accordingly to new size
 * note that this function is designed to match both the size fields in 'Add Area' zone and in 'Added walls' zone
 * @param {jQuery selection} $this "size" field
 */
update_wall_dimensions = function($this){
	var field_name = $this.attr("id").toString();
	var size = $this.val();
		
	// note that dimensions are fillen in millimeters, and wall is filles in square meters,
	// so the square must be multiplied by 1000*1000
	size = size * 1000000;
	
	var width_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	var length_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[length]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	
	var length = $("#" + length_field_name).val();
	var width = $("#" + width_field_name).val();

	if (is_int(length) && is_int(width)) {
		if (length > 0) {
			var new_width = Math.round(size / length);
			$("#" + width_field_name).val(new_width);
		} 
		else if (width > 0) {
			var new_length = Math.round(size / width);
			$("#" + length_field_name).val(new_length);
		} 
	}
};


/**
 * Calculates total wall area 
 */
calculate_total_walls_area = function(){
	var new_size = 0;
	$("#add_walls_target").find(".wall_size").each(function(){
		var part_size = $(this).val();
		if (is_float(part_size)) {
			new_size += parseFloat(part_size);
		}
	});
	new_size = new_size.toFixed(2);
	$("#add_walls_target .total_wall_area").val(new_size);
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


//------------------------- Gables
 
 

/**
 * Adds new gable to project
 */
add_gable = function(){
	var gable_base = $("#add_gable\\[base\\]").val();
	var gable_height = $("#add_gable\\[height\\]").val();
	var gable_size = gable_base * gable_height * 0.000001;
	gable_size = gable_size.toFixed(2);
	
	if ((gable_base > 99) && (gable_height > 99) && (gable_size > 0)) {
		var new_gable_field = $("#template_addgable tbody").html().toString();

		var max_field_number = 0;

		/* Calculate number of gables that already added */
		$("#add_gables_target").find("input.gable_base").each(function(){
			var field_number = parseInt($(this).attr("number"));

			if (field_number > max_field_number) {
				max_field_number = field_number;
			}
		});

		var field_number = +max_field_number + 1;

		var new_gable_field = new_gable_field
			.replace(new RegExp("_LABEL_",'g'), field_number)
			.replace(new RegExp("_STEP_",'g'),"step3")
			.replace(new RegExp("_FIELDNAME_",'g'),"gables")
			.replace(new RegExp("_ID_",'g'),field_number)
			.replace(new RegExp("_BASE_",'g'),gable_base)
			.replace(new RegExp("_HEIGHT_",'g'),gable_height)
			.replace(new RegExp("_SIZE_",'g'),gable_size);
		$("#add_gables_target tbody.gables").append(new_gable_field);

		// add validation
		$('#step3\\[gables\\]\\[' + field_number + '\\]\\[base\\]').rules( "add", {
			required: true,
			min: 100,
		});
		$('#step3\\[gables\\]\\[' + field_number + '\\]\\[height\\]').rules( "add", {
			required: true,
			min: 100,
		});
		$('#step3\\[gables\\]\\[' + field_number + '\\]\\[size\\]').rules( "add", {
			required: true,
			min: 0.01,
		});
	}
	else {
		alert('Please check gable size. Minimum base and height are 100 mm');
	}
	
};

/**
 * Load saved gables to project
 * @param {Array} step_data
 */
load_gables = function(step_data){
		
	var gables = step_data["gables"];
	for (var gable_number in gables) {
		var gable = gables[gable_number];

		var new_gable_field = $("#template_addgable tbody").html().toString();

		var new_gable_field = new_gable_field
			.replace(new RegExp("_LABEL_",'g'),gable_number)
			.replace(new RegExp("_STEP_",'g'),"step3")
			.replace(new RegExp("_FIELDNAME_",'g'),"gables")
			.replace(new RegExp("_ID_",'g'),gable_number)
			.replace(new RegExp("_BASE_",'g'),gable["base"])
			.replace(new RegExp("_HEIGHT_",'g'),gable["height"])
			.replace(new RegExp("_SIZE_",'g'),gable["size"]);
		$("#add_gables_target tbody.gables").append(new_gable_field);
		
		// due to formwizard bug, th validation must be applied only after users goes to step2
		$("#calcForm").bind("step_shown", function(event, data){
			if (data.currentStep == 'step3') {
				// add validation
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[base\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[height\\]').rules( "add", {
					required: true,
					min: 100,
				});
				$('#step3\\[gables\\]\\[' + gable_number + '\\]\\[size\\]').rules( "add", {
					required: true,
					min: 0.01,
				});
			}
		});
		
	}

	$("#step3\\[total_gable_area\\]").val(step_data["total_gable_area"]);
	

};

/**
 * Deletes gable from project
 * @param {jQuery selection} $gable_button button that was clicked
 */
delete_gable = function($gable_button){
   $gable_button.parent().parent().remove();
};

/**
 * Calculates the gable size
 * @param {jQuery selection} $this "base" or "height" field
 * @param {String} mode tells what fiels was changed - "base" or "height"
 */
calculate_gable_size = function($this,mode){
	var field_name = $this.attr("id").toString();
	
	if (mode === "base") {
		var another_field_name = field_name.replace(new RegExp("\\[base\\]",'g'),"[height]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		var size_field_name = field_name.replace(new RegExp("\\[base\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	else if (mode === "height") {
		another_field_name = field_name.replace(new RegExp("\\[height\\]",'g'),"[base]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		size_field_name = field_name.replace(new RegExp("\\[height\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	
	var this_dimension = parseInt($this.val());
	var another_dimension = parseInt($("#" + another_field_name).val());
	
	if (is_int(this_dimension) && is_int(another_dimension)) {
		var size = this_dimension * another_dimension;
		
		// note that dimensions are fillen in millimeters, and gable is filles in square meters,
		// so the square must be divided by 1000*1000
		size = size * 0.000001;
		
		size = +size.toFixed(2);
		
		$("#" + size_field_name).val(size);
	}
};


/**
 * Updates gable base or height accordingly to new size
 * note that this function is designed to match both the size fields in 'Add Area' zone and in 'Added gables' zone
 * @param {jQuery selection} $this "size" field
 */
update_gable_dimensions = function($this){
	var field_name = $this.attr("id").toString();
	var size = $this.val();
		
	// note that dimensions are fillen in millimeters, and gable is filles in square meters,
	// so the square must be multiplied by 1000*1000
	size = size * 1000000;
	
	var base_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[base]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	var height_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[height]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	
	var height = $("#" + height_field_name).val();
	var base = $("#" + base_field_name).val();

	if (is_int(height) && is_int(base)) {
		if (height > 0) {
			var new_base = Math.round(size / height);
			$("#" + base_field_name).val(new_base);
		} 
		else if (base > 0) {
			var new_height = Math.round(size / base);
			$("#" + height_field_name).val(new_height);
		} 
	}
};


/**
 * Calculates total gable area 
 */
calculate_total_gables_area = function(){
	var new_size = 0;
	$("#add_gables_target").find(".gable_size").each(function(){
		var part_size = $(this).val();
		if (is_float(part_size)) {
			new_size += parseFloat(part_size);
		}
	});
	new_size = new_size.toFixed(2);
	$("#add_gables_target .total_gable_area").val(new_size);
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


	