window.validation_rules =  {
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
};

