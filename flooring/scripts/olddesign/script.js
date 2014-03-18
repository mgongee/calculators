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

	/***************** legacy code *************************/ 
	
	/*f-navigation*/
		$('#f-navigation li').each(function(){
		$(this).hover(function(){
			$(this).find('.f-items-top').animate({marginLeft:'-40px',width:'80px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'-10px',width:'80px',marginLeft:'-40px'},100);
		},
		function () {
			$(this).find(".f-items-top, .f-items-bottom").stop();
			$(this).find('.f-items-top').animate({marginLeft:'-37px',width:'75px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'0px',width:'75px',marginLeft:'-37px'},100);

		});
		});
		
		/*f-navigation*/
		$('#f-navigation td div').each(function(){
		$(this).hover(function(){
			$(this).find('.f-items-top').animate({marginLeft:'-40px',width:'80px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'-10px',width:'80px',marginLeft:'-40px'},100);
		},
		function () {
			$(this).find(".f-items-top, .f-items-bottom").stop();
			$(this).find('.f-items-top').animate({marginLeft:'-37px',width:'75px'},100);
			$(this).find('.f-items-bottom').animate({bottom:'0px',width:'75px',marginLeft:'-37px'},100);

		});
		});

	/*End f-navigation*/

});

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
	obj.visibility=v; }  
	}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}