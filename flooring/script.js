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
	$.import_js('scripts/list_data.js');
	
	/**
	 * Load data about form elements into "form_elements" variable
	 */
	$.import_js('scripts/form_elements.js');

	/**
	 * Load form create & fill functions
	 */
	$.import_js('scripts/form_create.js');
	
	/**
	 * Load form validation rules into "validation_rules" variable
	 */
	$.import_js('scripts/validation_rules.js');
	
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
			console.log('eidt');
			create_form_edit($form,form_elements);
		}
		else { //  if project data is not specified, create form to start new project
			console.log('new');
			create_form_add($form,form_elements);
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
	 */
	$("#add_area_button").click(
			add_area
	);
		
	/**
	 * Remove added area on button click
	 */
	$("#add_areas_target").on('click', '.remove_area_button', function() {
		delete_area($(this))
	});
	
	
	/**
	 * Update area size when width is changed
	 */
	$(".add_area_form").on('keyup', '.area_width',function() {
		calculate_area_size($(this),'width')
	});
	
	/**
	 * Update area size when length is changed
	 */
	$(".add_area_form").on('keyup', '.area_length',function() {
		calculate_area_size($(this),'length')
	});
	
	
	/**
	 * Update added area size when width is changed
	 */
	$("#add_areas_target").on('keyup', '.area_width',function() {
		calculate_area_size($(this),'width')
	});
	
	/**
	 * Update added area size when length is changed
	 */
	$("#add_areas_target").on('keyup', '.area_length',function() {
		calculate_area_size($(this),'length')
	});
	
	
	/**
	 * Update area dimensions
	 */
	$(".add_area_form").on('keyup', '.area_size',function() {
		update_area_dimensions($(this))
	});
	
	/**
	 * Update added area dimensions
	 */
	$("#add_areas_target").on('keyup', '.area_size',function() {
		update_area_dimensions($(this))
	});
});