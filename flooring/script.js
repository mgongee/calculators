$(document).ready(function(){
	
	/**
	 * tag 'select' with list of projects
	 */
	$( "select#project_id" ).change(function() {
		var val = $(this).val()
		if (val > 0) {
			window.location.href = "?route=edit&id=" + $(this).val();
		}
	});
	
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
	
	$.import_js('scripts/validation_rules.js');
	
});