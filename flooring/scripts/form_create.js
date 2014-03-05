
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