window.form_elements = {
	"step1": {
		"name" : "Step 1 - Input project data",
		"fill_from_template": true, // at first, all field generated by JS and inserted to the step form. But to implement custom design, JS generation was replaced by the templates.
		"fields": {
			"project_name": {
				"label": "Project name",
				"type": "text"
			},
			"product": {
				"label": "Select the product required",
				"type": "list"
			},
			"type_of_frame": {
				"label": "Type of frame",
				"type": "list"
			},
			"allowance": {
				"label": "Allowance %",
				"type": "text",
				"default_value": "5"
			},
			"wind_zone": {
				"label": "Wind zone",
				"type": "list"
			}
		},
		"template": "step1",
		"appendix": "step3_button"
	},
	"step2": {
		"name" : "Step 2 - Adding walls and openings",
		"fields": {},
		"template": "step2",
		"appendix": "step3_button"
	},
	"step3": {
		"name" : "Step 3 - Adding gable areas",
		"fields": {},
		"template": "step3",
		"appendix": "step3_button"
	},
};

window.calculation_elements = {
	"number_of_boards": {
		"label": "No. of boards",
		"type": "text"
	},
	"number_of_fasteners": {
		"label": "No. of fasteners",
		"type": "text"
	},
	"amount_of_sealant": {
		"label": "Amount of Polyurethane sealant",
		"type": "text",
		"units" : "mL"
	}
};

window.estimation_elements = {
	"wind_zone": {
		"label": "Wind zone",
		"type": "text",
		"units": "",
		"source": "db"
	},
	"type_of_frame": {
		"label": "Type of frame",
		"type": "list",
		"units": "",
		"source": "db"
	},
	"stub_and_fasteners_spacing": {
		"label": "Stud & Fastener spacing",
		"type": "text",
		"units": "mm",
		"source": "js",
		"value": 300
	},
	"total_wall_area": {
		"label": "Total wall area",
		"type": "text",
		"units": "m2",
		"source": "db"
	},	
	"total_gable_area": {
		"label": "Total gable area",
		"type": "text",
		"units": "m2",
		"source": "db"
	},
	"total_opening_area": {
		"label": "Total opening area",
		"type": "text",
		"units": "m2",
		"source": "db"
	},	
	"allowance": {
		"label": "Allowance",
		"type": "text",
		"units": "%",
		"source": "db"
	},
	"total_product_estimation": {
		"label": "Total product estimation",
		"type": "text",
		"units": "m2",
		"source": "db"
	},	
};