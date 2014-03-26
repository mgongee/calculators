/**
 * There are functions that related to processing changes in the created form
 */

/*********** Code for Estimate page ************/

/**
 * Adds new length to project
 */
add_length = function(){
	var length_size = $("#add_length\\[length\\]").val();

	if (length_size > 1) {
		var new_length = $("#template_addlength tbody").html().toString();

		var max_field_number = 0;

		/* Calculate number of lengths that already added */
		$("#add_lengths_target").find("input.length_size").each(function(){
			var field_number = parseInt($(this).attr("number"));

			if (field_number > max_field_number) {
				max_field_number = field_number;
			}
		});

		var field_number = +max_field_number + 1;

		var new_length = new_length
			.replace(new RegExp("_LABEL_",'g'), field_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"lengths")
			.replace(new RegExp("_ID_",'g'),field_number)
			.replace(new RegExp("_LENGTH_",'g'),length_size)
	
		$("#add_lengths_target tbody").append(new_length);

		// add validation
		$('#step2\\[lengths\\]\\[' + field_number + '\\]\\[length\\]').rules( "add", {
			required: true,
			min: 1,
		});
	}
	else {
		alert('Please check length size. Minimum length is 1 mm');
	}
	
};

/**
 * Load saved lengths to project
 * @param {Array} step_data
 */
load_lengths = function(step_data){
		
	var lengths = step_data["lengths"];
	for (var length_number in lengths) {
		var length = lengths[length_number];

		var new_length_field = $("#template_addlength tbody").html().toString();

		var new_length_field = new_length_field
			.replace(new RegExp("_LABEL_",'g'), length_number)
			.replace(new RegExp("_STEP_",'g'),"step2")
			.replace(new RegExp("_FIELDNAME_",'g'),"lengths")
			.replace(new RegExp("_ID_",'g'),length_number)
			.replace(new RegExp("_LENGTH_",'g'),length['length'])
	
		$("#add_lengths_target tbody").append(new_length_field);

		// due to formwizard bug, th validation must be applied only after users goes to step2
		$("#calcForm").bind("step_shown", function(event, data){
			if (data.currentStep == 'step2') {
				// add validation
				$('#step2\\[lengths\\]\\[' + length_number + '\\]\\[length\\]').rules( "add", {
					required: true,
					min: 1,
				});
			}
		});
		
	}

	$("#step2\\[total_length_size\\]").val(step_data["total_length_size"]);
	

};

/**
 * Deletes length from project
 * @param {jQuery selection} $length_button button that was clicked
 */
delete_length = function($length_button){
   $length_button.parent().parent().remove();
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
		another_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
		size_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]");
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
 * Calculates total length 
 */
calculate_total_length = function(){
	var new_size = 0;
	$("#add_lengths_target").find(".length_size").each(function(){
		var part_size = $(this).val();
		if (is_float(part_size)) {
			new_size += parseFloat(part_size);
		}
	});
	new_size = new_size.toFixed(2);
	$("#add_lengths_target .total_length_size").val(new_size);
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


	