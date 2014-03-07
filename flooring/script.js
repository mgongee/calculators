$(document).ready(function(){
	
	(function($)
	{
		/*
		 * $.import_js() helper (for JavaScript importing within JavaScript code).
		 */
		var import_js_imported = [];

		$.extend(true,
		{
			import_js : function(script)
			{
				var found = false;
				for (var i = 0; i < import_js_imported.length; i++)
					if (import_js_imported[i] == script) {
						found = true;
						break;
					}

				if (found == false) {
					$("head").append('<script type="text/javascript" src="' + script + '"></script>');
					import_js_imported.push(script);
				}
			}
		});

	})(jQuery);
	
	
	/**
	 * Load data about form lists into "list_data" variable
	 */
	$.import_js('scripts/data_list.js');
	
	/**
	 * Load data about form elements into "form_elements" variable
	 */
	$.import_js('scripts/data_form_elements.js');

	/**
	 * Load service functions
	 */
	$.import_js('scripts/functions_service.js');
	
	/**
	 * Load form create & fill functions
	 */
	$.import_js('scripts/functions_form_create.js');
	
	/**
	 * Load form processing functions
	 */
	$.import_js('scripts/functions_form_process.js');
	
	/**
	 * Load form calculation functions
	 */
	$.import_js('scripts/functions_form_calculation.js');
	
	
	/**
	 * Load form validation rules into "validation_rules" variable
	 */
	$.import_js('scripts/data_validation_rules.js');
	
	/**
	 * Load project calculation rules into "calculation_rules" variable
	 */
	$.import_js('scripts/data_calculation_rules.js');
	
	/*********** Code for Index page ************/
		
	/**
	 * tag 'select' with list of projects
	 */
	$( "select#project_id" ).change(function() {
		var val = $(this).val()
		if (val > 0) {
			window.location.href = "?route=edit&id=" + $(this).val();
		}
	});
	
	
	/*********** Code for Edit page ************/
	
	/**
	 * If form is present
	 */
	if ($('#fieldWrapper').length) {
		$form = $('#fieldWrapper');
		if ($('#projectData').length) { // if project data is specified, create form to edit the project
			create_form_to_edit_project($form,form_elements);
		}
		else { //  if project data is not specified, create form to start new project
			create_form_to_add_project($form,form_elements);
		}
	}
	
	$("#calcForm").formwizard({
		formPluginEnabled: false,
		validationEnabled: true,
		focusFirstInput : true,
		validationOptions : validation_rules
	});
	
	/**
	 * Add new area on button click
	 * in the 'Add Area' zone
	 */
	$("#add_area_button").click(function(){
			add_area();
			calculate_total_area();
	});
		
	/**
	 * Remove added area on button click
	 */
	$("#add_areas_target").on('click', '.remove_area_button', function() {
		delete_area($(this));
		calculate_total_area();
	});
	
	
	/**
	 * Update area size when width is changed
	 * in the 'Add Area' zone
	 */
	$(".add_area_form").on('keyup', '.area_width',function() {
		calculate_area_size($(this),'width');
	});
	
	/**
	 * Update area size when length is changed
	 * in the 'Add Area' zone
	 */
	$(".add_area_form").on('keyup', '.area_length',function() {
		calculate_area_size($(this),'length');
	});
	
	
	/**
	 * Update added area size when width is changed
	 * in the 'Added Areas' zone
	 */
	$("#add_areas_target").on('keyup', '.area_width',function() {
		calculate_area_size($(this),'width');
		calculate_total_area();
	});
	
	/**
	 * Update added area size when length is changed
	 * in the 'Added Areas' zone
	 */
	$("#add_areas_target").on('keyup', '.area_length',function() {
		calculate_area_size($(this),'length');
		calculate_total_area();
	});
	
	
	/**
	 * Update area dimensions
	 * in the 'Add Area' zone
	 */
	$(".add_area_form").on('keyup', '.area_size',function() {
		update_area_dimensions($(this));
	});
	
	/**
	 * Update added area dimensions
	 * in the 'Added Areas' zone
	 */
	$("#add_areas_target").on('keyup', '.area_size',function() {
		update_area_dimensions($(this)); 
		calculate_total_area();
	});
	
	$("#next").click(function(){
		var formState = $("#calcForm").formwizard("state");
		if (formState["isLastStep"]) {
			calculate_project(formState["currentStep"]);
		}
		console.log(formState,formState["isLastStep"]);
	});
});