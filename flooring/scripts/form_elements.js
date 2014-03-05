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
				"type": "text"
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
				"type": "text"
			},
			"sheet_size": {
				"label": "Sheet size",
				"type": "list"
			}
		}
	},
	"step2": {
		"name" : "Step 2 - Calculate project",
		"fields": {
			"number_of_sheets": {
				"label": "No. of sheets",
				"type": "text"
			},
			"number_of_fasteners_per_sheet": {
				"label": "No. of fasteners per sheet",
				"type": "text"
			},
			"amount_of_epoxy_per_sheet": {
				"label": "Amount of epoxy per sheet joint",
				"type": "text",
				"units" : {
					"0-1000" : "mL",
					"1000-100000" : "L",
				}
			},
			"amount_of_constr_adhesive_per_sheet": {
				"label": "Amount of construction adhesive per sheet",
				"type": "text",
				"units" : {
					"0-300" : "mL",
					"300-100000" : "tubes",
				}
			}
		}
	}
};