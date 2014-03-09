/**
 * There are functions that related to processing changes in the creasted form
 */


/**
 * Adds new area to project
 */
add_area = function(){
	var area_width = $("#add_area\\[width\\]").val();
	var area_length = $("#add_area\\[length\\]").val();
	var area_size = $("#add_area\\[size\\]").val();

	var new_area_field = $("#template_addarea tbody").html().toString();

	var max_field_number = 0;
	
	$("#add_areas_target").find("input.area_width").each(function(){
		var field_number = parseInt($(this).attr("number"));
		
		if (field_number > max_field_number) {
			max_field_number = field_number;
		}
	});
	
	var field_number = +max_field_number + 1;
	
	var new_area_field = new_area_field
		.replace(new RegExp("_LABEL_",'g'), field_number)
		.replace(new RegExp("_STEP_",'g'),"step2")
		.replace(new RegExp("_FIELDNAME_",'g'),"areas")
		.replace(new RegExp("_ID_",'g'),field_number)
		.replace(new RegExp("_WIDTH_",'g'),area_width)
		.replace(new RegExp("_LENGTH_",'g'),area_length)
		.replace(new RegExp("_SIZE_",'g'),area_size);
$("#add_areas_target tbody").append(new_area_field);
};

/**
 * Load saved areas to project
 */
load_areas = function(step_data){
		
	areas = step_data["areas"];
	for (var area_number in areas) {
		var area = areas[area_number];

		var new_area_field = $("#template_addarea tbody").html().toString();

		var new_area_field = new_area_field
			.replace(new RegExp("_LABEL_",'g'),area_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"areas")
			.replace(new RegExp("_ID_",'g'),area_number)
			.replace(new RegExp("_WIDTH_",'g'),area["width"])
			.replace(new RegExp("_LENGTH_",'g'),area["length"])
			.replace(new RegExp("_SIZE_",'g'),area["size"]);
		$("#add_areas_target tbody").append(new_area_field);
	}

	$("#step2\\[total_area_size\\]").val(step_data["total_area_size"]);
};

/**
 * Deletes area from project
 * @param {jQuery selection} $area_button button that was clicked
 */
delete_area = function($area_button){
   $area_button.parent().parent().remove();
};

/**
 * Calculates the area size
 * @param {jQuery selection} $this "width" or "length" field
 * @param {String} mode tells what fiels was changed - "width" or "length"
 */
calculate_area_size = function($this,mode){
	var field_name = $this.attr("id").toString();
	
	if (mode === "width") {
		var another_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[length]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		var size_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	else if (mode === "length") {
		var another_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		var size_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
	}
	
	var this_dimension = parseInt($this.val());
	var another_dimension = parseInt($("#" + another_field_name).val());
	
	if (is_int(this_dimension) && is_int(another_dimension)) {
		var size = this_dimension * another_dimension;
		
		// note that dimensions are fillen in millimeters, and area is filles in square meters,
		// so the square must be divided by 1000*1000
		size = size * 0.000001;
		
		size = +size.toFixed(2);
		
		$("#" + size_field_name).val(size);
	}
};


/**
 * Updates area width or length accordingly to new size
 * note that this function is designed to match both the size fields in 'Add Area' zone and in 'Added areas' zone
 * @param {jQuery selection} $this "size" field
 */
update_area_dimensions = function($this){
	var field_name = $this.attr("id").toString();
	var size = $this.val();
	
	// note that dimensions are fillen in millimeters, and area is filles in square meters,
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
 * Calculates total building floor area 
 */
calculate_total_area = function(){
	new_size = 0;
	$("#add_areas_target").find(".area_size").each(function(){
		part_size = $(this).val();
		if (is_float(part_size)) {
			new_size += parseFloat(part_size);
		}
	});
	new_size = new_size.toFixed(2);
	$("#add_areas_target .total_area_size").val(new_size);
};

