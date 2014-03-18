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
	$.import_js('scripts/olddesign/functions_service.js');
	
	/**
	 * Load form create & fill functions
	 */
	$.import_js('scripts/olddesign/functions_form_create.js');
	
	/**
	 * Load form processing functions
	 */
	$.import_js('scripts/olddesign/functions_form_process.js');
	
	/**
	 * Load form calculation functions
	 */
	$.import_js('scripts/olddesign/functions_form_calculation.js');

	/**
	 * Load estimation functions
	 */
	$.import_js('scripts/olddesign/functions_form_estimation.js');

	
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
	$( "select#load_project_id" ).change(function() {
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
		var $form = $('#fieldWrapper');
		if ($('#projectData').length) { // if project data is specified, create form to edit the project
			create_form_to_edit_project($form, window.form_elements);
		}
		else { //  if project data is not specified, create form to start new project
			create_form_to_add_project($form, window.form_elements);
		}
	}
	
	$("#calcForm").formwizard({
		formPluginEnabled: false,
		validationEnabled: true,
		focusFirstInput : true,
		validationOptions : validation_rules,
		textSubmit: "",
		textNext: "",
		textBack: "",
		inDuration: 0,
		outDuration: 0
	});
	
	
	if ($("#project_id").length) {
		
		var addPage = false;
		var editPage = true;
	}
	else {
		var addPage = true;
		var editPage = false;

	}
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
	
	/**
	 * Next step button
	 */
	$("#next").click(function(){
		var formState = $("#calcForm").formwizard("state");
		if (formState["isLastStep"]) {
			calculate_project(formState["currentStep"]);
		}
	});
	
	/* On next and back buttons clicks */
	$("#calcForm").bind("step_shown", function(event, data){
		if (!data.isFirstStep) {
			$("#back").show();
			$("#load_projects").hide();
			$("#Step1_prod_text").hide();
			$(".go_to_estimation").show();
			$("#bg_img").attr("src", "images/Step2floor_bg.jpg");
			
		}
		else { // first step
			$("#back").hide();
			$("#load_projects").show();
			$("#Step1_prod_text").show();
			$(".go_to_estimation").hide();
			$("#bg_img").attr("src", "images/Step1_bg_floor.jpg");
		}
	});
	
	$("#back").hide();
	if (addPage) {
		$(".go_to_estimation").hide();
	}
	
	/**
	 * Go to estimation page
	 */
	$(".go_to_estimation").click(function(){
		var formState = $("#calcForm").formwizard("state");
		$("#action").val("estimate");
		
		if (addPage) {
			if (formState["isLastStep"]) {
				$("#next").trigger( "click" );
			}
			else {
				$("#next").trigger( "click" );
				$("#next").trigger( "click" );
			}
		}
		if (editPage) {
			if (formState["isLastStep"]) {
				$("#next").trigger( "click" );
			}
			else if (formState["currentStep"] == "step2") {
				$("#next").trigger( "click" );
				$("#next").trigger( "click" );
			}
			else if (formState["currentStep"] == "step1") {
				$("#next").trigger( "click" );
				$("#next").trigger( "click" );
				$("#next").trigger( "click" );
			}
		}
	});
	
	/*********** Code for Estimate page ************/
	
	/**
	 * If table	 is present
	 */
	if ($('#estimation_values').length) {
		estimate_project();
		create_bill_list();
		calculate_labour_rate();
		calculate_total_bill();
	}
	
	/**
	 * Add new bill entry on button click
	 */
	$("#button_add_item").click(function(){
			add_bill_item();
			calculate_total_bill();
	});
	
	/**
	 * Remove bill item on button click
	 */
	$("#bill_of_quantities").on('click', '.bill_delete_button', function() {
		delete_bill_item($(this));
		calculate_total_bill();
	});
	
	$("#button_show_cost").click(function() {
		$("th.cost_unit").show();
		$(".bill_item_cost").show();
	});
	
	$("#button_hide_cost").click(function() {
		$("th.cost_unit").hide();
		$(".bill_item_cost").hide();
	});
	
	/**
	 * Update total cost when data is changed
	 * in the 'Bill of Quantites' zone
	 */
	$("#bill_of_quantities").on('keyup', '.bill_item_quantity',function() {
		calculate_total_bill();
	});
	$("#bill_of_quantities").on('keyup', '.bill_item_cost',function() {
		calculate_total_bill();
	});
	
	/**
	 * Update labour cost when data is changed
	 * in the 'Calculate labour rates' zone
	 */
	$("#labour_rates_data").on('keyup', "#labour\\[flooring\\]",function() {
		calculate_labour_rate();
		calculate_total_bill();
	});
	$("#labour_rates_data").on('keyup', "#labour\\[floor_finish\\]",function() {
		calculate_labour_rate();
		calculate_total_bill();
	});
	
	$(".make_report_button").click(function(){
		var report_type = $(this).attr("id");
		$("#report_type").val(report_type);
		$("#estimationForm").submit();
	});
	
	$(".project_action_button").click(function(){
		var action_type = $(this).attr("id");
		var project_id = $("#project_id").val();
		var new_name = $("#new_name").val();
		if (action_type == 'saveas') {
			window.location.href = "index.php?route=saveas&new_name=" + encodeURIComponent(new_name) + "&project_id=" + project_id;
		}
		if (action_type == 'delete') {
			if (confirm("Are you sure want to delete this project?")) {
				$.post( "index.php?route=delete", {'project_id': project_id}, function( data ) {
					if (data == "ok") {
						alert("The project was deleted successfully");
						window.location.href = "?route=index&messageDelete=1";
					}
					else {
						alert("There was some error when deleting project.");
					}
					
				});
			}
		}
	});
	
	/**
	 * Load cost library on select on dropdown list
	 * tag 'select' with list of libraries
	 */
	$( "select#cost_library_id" ).change(function() {
		var val = $(this).val();
		if (val != "0") {
			var url = "index.php?route=ajax&action=get_prices&library_name=" + val;
			$.getJSON(url, function( data ) {
				load_prices(data);
			});
		}
	});
	
	
	/*  scroll */
	$('#estimation_low_right_table').kinetic();
	$('.scrolling').kinetic();

});
