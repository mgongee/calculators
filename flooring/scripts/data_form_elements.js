form_elements = {
	"step1": {
		"name" : "Step 1 - Input project data",
		"fields": {
			"project_name": {
				"label": "Project name",
				"type": "text"
			},
			"product": {
				"label": "Select the product required",
				"type": "list"
			},
			"number_of_buildings": {
				"label": "No. of buildings",
				"type": "text",
				"default_value": "1"
			},
			"type_of_frame": {
				"label": "Type of frame",
				"type": "list"
			},
			"floor_joist_space": {
				"label": "Floor Joist space",
				"type": "list"
			},
			"waste": {
				"label": "Waste %",
				"type": "text",
				"default_value": "5"
			},
			"sheet_size": {
				"label": "Sheet size",
				"type": "list"
			}
		}
	},
	"step2": {
		"name" : "Step 2 - Adding areas",
		"fields": {},
		"template": "step2"
	},
	"step3": {
		"name" : "Step 3 - Calculated project",
		"fields": {
			"number_of_sheets": {
				"label": "No. of sheets",
				"type": "text"
			},
			"number_of_fasteners": {
				"label": "No. of fasteners",
				"type": "text"
			},
			"amount_of_epoxy": {
				"label": "Amount of epoxy",
				"type": "text",
				"units" : {
					"0-1000" : "mL",
					"1000-100000" : "L",
				}
			},
			"amount_of_constr_adhesive": {
				"label": "Amount of construction adhesive",
				"type": "text",
				"units" : {
					"0-300" : "mL",
					"300-100000" : "tubes",
				}
			}
		}
	}
};