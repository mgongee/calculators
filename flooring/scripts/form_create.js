
function is_int(value){
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		return true;
	} else {
		return false;
	}
}
/**
 * Create form tags and fill lists with options
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
create_form_add = function($form, form_data) {
	form_create_tags($form, form_data)
}

/**
 * Create form tags and fill fields frol loaded project
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
create_form_edit = function($form, form_data) {
	
	var project_json = $("#projectData").html()
	var project_data = jQuery.parseJSON(project_json)
	
	form_create_tags($form, form_data)
	form_fill(form_data, project_data)
}	

/**
 * Create form tags & steps
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
form_create_tags = function($form, form_data) {
	var html = "<div id=\"fieldWrapper\">";

	for (var step in form_data) {

		var step_name = form_data[step]["name"]
		var step_fields_data = form_data[step]["fields"]
		var step_fields_html = prepare_step_fields(step, step_fields_data)

		/* Add Step header */
		html += "<div id=\"" + step + "\" class=\"step\" >"
				+ "<div class=\"row\">"
				+	"<div class=\"col-md-12\">"
				+	"<h1>" + step_name + "</h1>"
				+	"</div>"
				+ "</div>";

		/* Load template if provided*/
		if (typeof form_data[step]["template"] !== 'undefined') {
			template_name = form_data[step]["template"]
			$template = $("#template_" + template_name)
			if ($template.length > 0) {
				html += $template.html()
			}
		}
		
		
		/* Add step fields*/ 
		html += "<div class=\"row\">"
				+	"<div class=\"col-md-6\">"
				+		step_fields_html
				+	"</div>"
				+ "</div>";

		html += "</div>"
	}
	html += "</div>"
	
	$form.html(html);
}


/**
 * Creates step fields (text inputs or selects)
 * @param {string} step eg. "step1", "step2"
 * @param {array} step_fields_data
 * @returns {String}
 */
prepare_step_fields = function(step, step_fields_data) {
	
	var step_fields_html = ""
	
	for (var field_name in step_fields_data) {
		
		step_fields_html += "<div class=\"form-group\">"
		
		var field_full_name = step + "[" + field_name + "]"
		var field_label = step_fields_data[field_name]["label"]
		var field_type = step_fields_data[field_name]["type"]
		var field_units = step_fields_data[field_name]["units"]
		
		step_fields_html += "<label class=\"input-label\" for=\"" + field_full_name + "\">" + field_label  + "</label>"
		
		step_fields_html += "<br/>"
		
		/* create Field tag */
		
		if (field_type === "text") {
			step_fields_html += "<input name=\"" + field_full_name + "\" class=\"input-field\" id=\"" + field_full_name + "\" type=\"text\"/>"
		}
		else if (field_type === "list") {
			var field_list_items = list_data[step + "_" + field_name]
			
			step_fields_html += "<select id=\"" + field_full_name + "\" name=\"" + field_full_name + "\" class=\"form-control\">"
			
			for (item in field_list_items) {
				var item_name = field_list_items[item];
				step_fields_html += "<option value=\"" + item + "\">" + item_name + "</option>"
			}
			
			step_fields_html += "</select>"
			
				
		}
		
		/* end of field tag */
		
		/* Create units tag */
		if (typeof field_units !== "undefined") {
			step_fields_html += "<span class=\"units\" id=\"units_" + field_name +"\">mL</span>"
		}

		step_fields_html += "</div>"
	}
	
	return step_fields_html;
}


/**
 * Fills form fields with values
 * @param Array form_data
 * @param Array project_data
 */
form_fill = function(form_data, project_data) {
	for (var step in form_data) {

		var step_fields_data = form_data[step]["fields"]
		var project_fields_data = project_data[step]
		
		for (field_name in step_fields_data) {
			var field_full_name = step + "\\[" + field_name + "\\]"
			var field_type = step_fields_data[field_name]["type"]
			var field_value = project_fields_data[field_name]
			
			console.log("fill:",field_full_name,field_value)
			
			if (field_type === "text") {
				$("#" + field_full_name).val(field_value)
			}
			else if (field_type === "list") {
				
				$("#" + field_full_name + " option").filter(function() {
					console.log("fill list:",$(this).val(),field_value)
					return $(this).val() == field_value; 
				}).prop('selected', true);
			}
		}
	}
}

/**
 * Adds new area to project
 */
add_area = function(){
   var fields_count = $("#add_areas_target tr.area_entry").length + 1
   var area_width = $("#add_area\\[width\\]").val()
   var area_length = $("#add_area\\[length\\]").val()
   var area_size = $("#add_area\\[size\\]").val()

   var new_area_field = $("#template_addarea tbody").html().toString()
   //console.log(fields_count,new_area_field )
   var new_area_field = new_area_field
	   .replace(new RegExp("_LABEL_",'g'),'Floor ' + fields_count)
	   .replace(new RegExp("_STEP_",'g'),"step2")
	   .replace(new RegExp("_FIELDNAME_",'g'),"areas")
	   .replace(new RegExp("_ID_",'g'),fields_count)
	   .replace(new RegExp("_WIDTH_",'g'),area_width)
	   .replace(new RegExp("_LENGTH_",'g'),area_length)
	   .replace(new RegExp("_SIZE_",'g'),area_size)
   $("#add_areas_target tbody").append(new_area_field)
};

/**
 * Deletes area from project
 */
delete_area = function($area_button){
   $area_button.parent().parent().remove()
};

/**
 * Calculates the area size
 */
calculate_area_size = function($this,mode){
	var field_name = $this.attr("id").toString();
	
	if (mode == "width") {
		var another_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[length]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
		var size_field_name = field_name.replace(new RegExp("\\[width\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
	}
	else if (mode == "length") {
		var another_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
		var size_field_name = field_name.replace(new RegExp("\\[length\\]",'g'),"[size]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
	}
	
	var this_dimension = parseInt($this.val());
	var another_dimension = parseInt($("#" + another_field_name).val());
	
	if (is_int(this_dimension) && is_int(another_dimension)) {
		var size = this_dimension * another_dimension;
		$("#" + size_field_name).val(size)
	}
};


/**
 * Updates area width or length accordingly to new size
 */
update_area_dimensions = function($this){
	var field_name = $this.attr("id").toString();
	var size = $this.val()
	var width_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[width]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
	var length_field_name = field_name.replace(new RegExp("\\[size\\]",'g'),"[length]").replace(new RegExp("\\[",'g'),"\\[").replace(new RegExp("\\]",'g'),"\\]")
	
	var length = $("#" + length_field_name).val()
	var width = $("#" + width_field_name).val()

	if (is_int(length) && is_int(width)) {
		if (length > 0) {
			var new_width = Math.round(size / length)
			$("#" + width_field_name).val(new_width)
		} 
		else if (width > 0) {
			var new_length = Math.round(size / width)
			$("#" + length_field_name).val(new_length)
		} 
	}
   
};