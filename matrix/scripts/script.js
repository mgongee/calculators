$(document).ready(function(){
	
	
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
	 * If form is present (this means that current page is Add or Edit page)
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
	
	/* Initialize from wizard */
	$("#calcForm").formwizard({
		formPluginEnabled: false,
		validationEnabled: true,
		focusFirstInput : true,
		validationOptions : window.validation_rules,
		textSubmit: "",
		textNext: "",
		textBack: "",
		inDuration: 0,
		outDuration: 0
	});
	
	$('#step1\\[product\\]').on("change", function(){
		
		if ($(this).val() != "") {
			var application_options = get_wall_list_options('application',1);
			fill_list("step1[application]" , application_options,false);	
		}
		
	});
	
	/* Determine if it is Add or Edit page */
	if ($("#project_id").length) { // we know project ID if it was already saved in DB, so this must be Edit page
		var addPage = false;
		var editPage = true;
	}
	else { // this is Add page
		var addPage = true;
		var editPage = false;

	}
	
	
	/**** Walls ****/
	
	/**
	 * Add new wall on button click
	 * in the 'Add wall' zone
	 */
	$("#add_wall_button").on('click', function(){
		add_wall();
	});
		
	/**
	 * Remove added wall on button click
	 */
	$("#add_walls_target").on('click ', '.remove_wall_button', function() {
		delete_wall($(this));
	});
	
	
	/*** Openings ***/
	
	/**
	 * Show openings dialog
	 */
	$("#add_walls_target").on('click', '.show_dialog_openings_to_wall_button',function(){
		var number = $(this).attr("number");
		
		
		// see  http://dillieodigital.wordpress.com/2013/01/25/quick-tip-fixing-duplicatehidden-dialog-anomalies-with-jquery-ui/
		// http://stackoverflow.com/questions/7099938/jquery-ui-dialog-behaves-unpredictably
		var original = $("#opening_dialog\\[" + number + "\\]")[0];
		var clone = $(original).clone().attr('id', 'dialogIdClone');
		var saveHtml = $(original).html();

		$(original).html('');
		$(clone).dialog({
			open: function( event, ui ) {
				
				/**
				* Add new opening 
				*/
			   $(clone).on('click', '.add_opening_button', function() {
				   add_opening_to_wall($(this));
				   calculate_total_openings_area($(this), clone);
			   });
			   
			   /**
				* Close opening dialog
				*/
			   $(".ui-dialog").on('click ', '.openings_dialog_close', function() {
				  $(clone).dialog("close");
			   });
			   

				/**
				 * Remove added opening on button click
				 */
				 $(clone).on('click ', '.remove_opening_button', function() {
					delete_opening($(this));
					calculate_total_openings_area($(this), clone);
				});

			   	
				/**
				 * Update opening size when width is changed
				 * in the 'Add opening' zone
				 */
				$(clone).on('keyup', '.opening_width',function() {
					calculate_opening_size($(this),'width');
				});

				/**
				 * Update opening size when height is changed
				 * in the 'Add opening' zone
				 */
				$(clone).on('keyup', '.opening_height',function() {
					calculate_opening_size($(this),'height');
				});


				/**
				 * Update added opening size when width is changed
				 * in the 'Added opening' zone
				 */
				$(clone).on('keyup', '.opening_entry .opening_width',function() {
					calculate_opening_size($(this),'width');
					calculate_total_openings_area($(this), clone);
				});

				/**
				 * Update added opening size when height is changed
				 * in the 'Added opening' zone
				 */
				$(clone).on('keyup', '.opening_entry .opening_height',function() {
					calculate_opening_size($(this),'height');
					calculate_total_openings_area($(this), clone);
				});
				
				/**
				 * Update opening  dimensions
				 * in the 'Add opening' zone
				 */
				$(clone).on('keyup', '.opening_size',function() {
					update_opening_dimensions($(this));
				});

				/**
				 * Update added opening dimensions
				 * in the 'Added openings' zone
				 */
				$(clone).on('keyup', '.opening_entry .opening_size',function() {
					update_opening_dimensions($(this)); 
					calculate_total_openings_area($(this), clone);
				});
			},
			close: function( event, ui ) {
				var newHtml = $(clone).html();
				$(clone).remove();
				$(original).html(newHtml);	
			}
		});
		return false;
	});

	
	
	/**
	 * Next step button
	 */
		
	var user_was_on_the_first_step = false;
	
	/* On next and back buttons clicks */
	$("#calcForm").bind("step_shown", function(event, data){
		if (!data.isFirstStep) {
			user_was_on_the_first_step = true;
			
			$("#step1_banner").hide();
			$("#back").show();
			$("#load_projects").hide();
			$("#Step1_prod_text").hide();
			$(".go_to_estimation").show();
			
			// for step2
			if (data.currentStep == "step2") {
				$("#bg_img").attr("src", "images/Step2floor_bg.jpg");	
			}
			
			
		}
		else { // first step
			$("#step1_banner").show();
			$("#back").hide();
			$("#load_projects").show();
			$("#Step1_prod_text").show();
			if (addPage) {
				if (!user_was_on_the_first_step) {
					$(".go_to_estimation").hide();
				}
			}
			$("#bg_img").attr("src", "images/Step1_bg_floor.jpg");
		}
	});
		
	/* startup preparations */
	
	$("#back").hide();
	if (addPage) {
		$(".go_to_estimation").hide();
	}
	
	/**
	 * Go to estimation page
	 */
	$(".go_to_estimation").on('click ', function(){
		var formState = $("#calcForm").formwizard("state");
		$("#action").val("estimate");

		if (formState["isLastStep"]) {
			$("#next").trigger( "click" );
		}
		else {
			$("#next").trigger( "click" );
			$("#next").trigger( "click" );
		}
	});
	
	/* terms popup*/
	
	var terms_confirmed = false;
	$("#calcForm").bind("before_step_shown", function(event, data){
		
		if (data.currentStep == "step2") {
			if (!terms_confirmed) {
				$("#term_popup").dialog();
			}
		}
		return false;
	});
	
	$(".ui-dialog-titlebar-close").on('click ', function() {
		$("#term_popup").dialog("close");
		if (!terms_confirmed) {
			$("#back").click();
		}
	});
	
	$('#yes_arg').on('click ',function() {
		$("#term_popup").dialog("close");
		terms_confirmed = true;
	});
	$('#no_arg').on('click ', function() {
		$("#term_popup").dialog("close");
		$("#back").click();
	});
	

	
	/*********** Code for Estimate page ************/
	
	/**
	 * If table	 is present
	 */
	if ($('#estimation_values').length) {
		calculate_project();
		estimate_project();
		create_bill_list();
		calculate_labour_rate();
		calculate_total_bill();

		var settings = {
			showArrows: true,
			autoReinitialise: true
		};
		var scrollpanes = $('.scrolling');
		scrollpanes.jScrollPane(settings);
	}
	
	/**
	 * Add new bill entry on button click
	 */
	$("#button_add_item").on('click ', function(){
			add_bill_item();
			calculate_total_bill();
	});
	
	$(".show_labour_rates").on('click',function(){
		$("#labour_rates_data").toggle();
	});
	
	/**
	 * Remove bill item on button click
	 */
	$("#bill_of_quantities").on('click ', '.bill_delete_button', function() {
		delete_bill_item($(this));
		calculate_total_bill();
	});
	
	$("#button_show_cost").on('click ',function() {
		$("th.cost_unit").show();
		$(".bill_item_cost").show();
	});
	
	$("#button_hide_cost").on('click ',function() {
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
	$("#labour_rates_data").on('keyup', "#labour\\[painting\\]",function() {
		calculate_labour_rate();
		calculate_total_bill();
	});
	$("#labour_rates_data").on('keyup', "#labour\\[cladding\\]",function() {
		calculate_labour_rate();
		calculate_total_bill();
	});
	
	$(".make_report_button").on('click ', function(){
		var report_type = $(this).attr("id");
		$("#report_type").val(report_type);
		$("#estimationForm").submit();
	});
	
	$(".project_action_button").on('click ', function(){
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
	$("#next").click(function(){	
		var settings = {
			showArrows: true,
			autoReinitialise: true
		};
		var scrollpanes = $('.scrolling');
		scrollpanes.jScrollPane(settings);
	});
	
	
	$('area').click(function() { 		
		var url = $(this).attr('href'); 
		var formState = $("#calcForm").formwizard("state");
				
		if (formState["currentStep"] == "step1") {
			if (url == "step2") {
				$("#next").trigger('click');
			}	
		}
		else if (formState["currentStep"] == "step2") {
			if (url == "step1") {
				$("#back").trigger('click');
			}	
		}
		
		// To prevent default action 
	  return false; 
	});

});
