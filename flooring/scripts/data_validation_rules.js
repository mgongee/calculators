window.validation_rules =  {
	rules: {
		"step1[project_name]": "required",
		"step1[waste]": {
			required: true,
			digits: true,
			min: 0,
			max: 100
					
		},
		"add_area[width]": {
			required: false,
			number: true,
			min: 100
		},
		"add_area[length]": {
			required: false,
			number: true,
			min: 100
		},
		"add_area[size]": {
			required: false,
			number: true,
			min: 0.01
		},
	},
	messages: {
		"step1[project_name]": "Please enter project name",
		"step1[waste]": {
			required: "Please specify waste percent",
			digits: "Correct format is number from 0 to 100"
		}
	}
};

