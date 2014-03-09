/**
 * There are functions that creates forms
 */

/**
 * Create form tags and fill lists with options
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
create_form_to_add_project = function($form, form_data) {
	create_form_tags_and_steps($form, form_data);
};

/**
 * Create form tags and fill fields frol loaded project
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
create_form_to_edit_project = function($form, form_data) {
	
	var project_json = $("#projectData").html();
	var project_data = jQuery.parseJSON(project_json);
	
	create_form_tags_and_steps($form, form_data);
	fill_form_fields(form_data, project_data);
};

/**
 * Create form tags & steps
 * @param {jQuery selection} $form
 * @param {array} form_data
 */
create_form_tags_and_steps = function($form, form_data) {
	var html = "";

	for (var step in form_data) {

		var step_name = form_data[step]["name"];
		var step_fields_data = form_data[step]["fields"];
		var step_fields_html = prepare_step_fields(step, step_fields_data);

		/* Add Step header */
		html += "<div id=\"" + step + "\" class=\"step\" >"
				+	"<h1 class=\"step_header\">" + step_name + "</h1>";

		/* Load template if provided*/
		if (typeof form_data[step]["template"] !== 'undefined') {
			template_name = form_data[step]["template"];
			$template = $("#template_" + template_name);
			if ($template.length > 0) {
				html += $template.html();
			}
		}
		
		/* Add step fields*/ 
		html += "<div class=\"row\">"
				+		step_fields_html
				+ "</div>";

		html += "</div>";
	}
	
	$form.html(html);

};


/**
 * Creates step fields (text inputs or selects)
 * @param {string} step eg. "step1", "step2"
 * @param {array} step_fields_data
 * @returns {String}
 */
prepare_step_fields = function(step, step_fields_data) {
	
	var step_fields_html = "";
	
	for (var field_name in step_fields_data) {
		
		step_fields_html += "<div class=\"form-group\">";
		
		var field_full_name = step + "[" + field_name + "]";
		var field_label = step_fields_data[field_name]["label"];
		var field_type = step_fields_data[field_name]["type"];
		var field_units = step_fields_data[field_name]["units"];
		if (typeof step_fields_data[field_name]["default_value"] !== 'undefined') {
			var default_value = step_fields_data[field_name]["default_value"];
		}
		else {
			var default_value = "";
		}
		
		step_fields_html += "<label class=\"input-label\" for=\"" + field_full_name + "\">" + field_label  + "</label>";
		
		step_fields_html += "";
		
		/* create Field tag */
		
		if (field_type === "text") {
			step_fields_html += "<input name=\"" + field_full_name + "\" class=\"input-field field_text\" id=\"" + field_full_name + "\" type=\"text\" size=\"7\" value=\"" + default_value + "\"/>";
		}
		else if (field_type === "list") {
			var field_list_items = list_data[step + "_" + field_name];
			
			step_fields_html += "<select id=\"" + field_full_name + "\" name=\"" + field_full_name + "\" class=\"form-control field_text\">";
			
			for (item in field_list_items) {
				var item_name = field_list_items[item];
				step_fields_html += "<option value=\"" + item + "\">" + item_name + "</option>";
			}
			
			step_fields_html += "</select>";
			
				
		}
		
		/* end of field tag */
		
		/* Create units tag */
		if (typeof field_units !== "undefined") {
			step_fields_html += "<span class=\"units\" id=\"units_" + field_name +"\">mL</span>";
			// create hidden input to store units type
			
			var units_field_name = step + "[" + field_name + "_units]";
			step_fields_html += "<input type=\"hidden\" name=\"" + units_field_name + "\" id=\"" + units_field_name + "\"  value=\"" + field_units + "\" />";
		}

		step_fields_html += "</div>";
	}
	
	return step_fields_html;
};


/**
 * Fills form fields with values
 * @param {Array} form_data
 * @param {Array} project_data
 */
fill_form_fields = function(form_data, project_data) {
	for (var step in form_data) {

		var step_fields_data = form_data[step]["fields"];
		var project_fields_data = project_data[step];
		
		for (field_name in step_fields_data) {
			var field_full_name = step + "\\[" + field_name + "\\]";
			var field_type = step_fields_data[field_name]["type"];
			var field_value = project_fields_data[field_name];
			
			if (field_type === "text") {
				$("#" + field_full_name).val(field_value);
			}
			else if (field_type === "list") {
				
				// find the option value that matches to the stored value 
				$("#" + field_full_name + " option").filter(function() {
					return ($(this).val() == field_value); 
				}).prop('selected', true);
			}
		}
	}
	
		
	/* Load areas for flooring calculator */
	load_areas(project_data["step2"]);
};
