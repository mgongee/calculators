window.list_data = {
	"step1_product": {
		"hardieflex_flooring_16mm" : "HardieFlex Flooring 16 mm"
	},
	"step1_type_of_frame": {
		"steel_1.2_to_1.6mm_bmt" : "Steel 1.2 to 1.6 mm BMT"
	},
	"step1_floor_joist_space": {
		"300mm" : "300 mm"
	},
	"step1_sheet_size": {
		"16mm_x_600mm_x_2400mm" : "16mm x 600mm x 2400mm",
		"16mm_x_1200mm_x_2400mm" : "16mmx 1200mm x 2400mm"
	}
};

window.calculation_numbers = {
	"sheet_size" : {						// in square meters
		"16mm_x_600mm_x_2400mm" : 1.44,
		"16mm_x_1200mm_x_2400mm" : 2.88
	},
	"sheet_height" : {						// in millimeters
		"16mm_x_600mm_x_2400mm" : 2400,
		"16mm_x_1200mm_x_2400mm" : 2400
	},
	"sheet_width" : {						// in millimeters
		"16mm_x_600mm_x_2400mm" : 600,
		"16mm_x_1200mm_x_2400mm" : 1200
	},
	"number_of_fasteners_per_sheet" : {
		"16mm_x_600mm_x_2400mm" : 36,
		"16mm_x_1200mm_x_2400mm" : 63
	},
	"amount_of_epoxy_per_sheet" : {			// in mL
		"16mm_x_600mm_x_2400mm" : 16,
		"16mm_x_1200mm_x_2400mm" : 16
	},
	"amount_of_constr_adhesive_per_sheet" : { // in mL
		"16mm_x_600mm_x_2400mm" : 152,
		"16mm_x_1200mm_x_2400mm" : 305
	},
	"type_of_frame_codes" : {
		"steel_1.2_to_1.6mm_bmt" : "1.2-1.6mm"
	},
	"amount_of_adhesive_in_tube": 300,
	"product_id" : { // flooring
		"hardieflex_flooring_16mm" : {
			"16mm_x_600mm_x_2400mm" : 404673,
			"16mm_x_1200mm_x_2400mm" : 404658
		}
	},
	'product_amount_to_id': {
		'fastener': {
			'HardieDrive Screws 32mm long': {
				'70': '305768',
				'1000': '305769'
			}
		},
		'epoxy': {
			'Two-Part Epoxy': {
				'1': 'EPOX ml',
				'1000': 'EPOX'
			}
		},
		'adhesive': {
			'Construction Adhesive': {
				'1': 'CA ml',
				'300': 'CA'
			}
		}
	},
};


window.products_data = {
	// sheets
	'404673':{'name':'HardieFlex® Flooring 16mm x 600mm x 2400mm','cost':""},
	'404658':{'name':'HardieFlex® Flooring 16mm x 1200mm x 2400mm','cost':""},

	// fasteners
	'305768':{'name':'HardieDrive® Screw 32mm long Retail Pack',	'unit':'70\'s pack','cost':""},
	'305769':{'name':'HardieDrive® Screw 32mm long Wholesale Pack',	'unit':'1000\'s pack','cost':""},
	
	// epoxy
	'EPOX':{'name':'Two-Part Epoxy',								'unit':'1 Liter Can','cost':""},
	'EPOX ml':{'name':'Two-Part Epoxy',								'unit':'mL','cost':""},

	// construction adhesive
	'CA':{'name':'Construction Adhesive',							'unit':'300ml tube','cost':""},
	'CA ml':{'name':'Construction Adhesive',						'unit':'ml','cost':""},
};
