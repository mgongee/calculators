	$("#calcForm").formwizard({ 
		formPluginEnabled: false,
		validationEnabled: true,
		focusFirstInput : true,
		/*formOptions :{
			success: function(data){$("#status").fadeTo(500,1,function(){ $(this).html("Project saved!").fadeTo(5000, 0); })},
			beforeSubmit: function(data){$("#data").html("data sent to the server: " + $.param(data));},
			dataType: 'json',
			resetForm: true
		},*/
		validationOptions : {
			rules: {
				"step1[project_name]": "required",
				"step1[number_of_buildings]": {
					required: true,
					digits: true
				},
				"step1[waste]": {
					required: true,
					digits: true
				}
			},
			messages: {
				"step1[project_name]": "Please enter project name",
				"step1[number_of_buildings]": {
					required: "Please specify number of buildings",
					digits: "Correct format is number from 1 to 100"
				}
			}
		}	
	 }
	);
