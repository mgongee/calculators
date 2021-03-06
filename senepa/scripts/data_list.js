window.list_data = {
	"step1_product": {
		"hardieflex_senepa" : "Hardieflex Senepa"
	},
	"step1_type_of_frame": {
		"steel_0.55_to_1.66mm_bmt" : "Steel 0.55 to 1.66 mm BMT",
		"timber" : "Timber"	
	},
	"step1_product_size": {
		"9mm_x_254mm_x_2438mm" : "9mm x 254mm x 2438mm",
		"12mm_x_254mm_x_2438mm" : "12mm x 254mm x 2438mm",
		"12mm_x_305mm_x_2438mm" : "12mm x 305mm x 2438mm",
		"12mm_x_305mm_x_3360mm" : "12mm x 305mm x 3360mm",
	}
};

window.calculation_numbers = {
	"product_id" : { // senepa
		"hardieflex_senepa" : {
			"9mm_x_254mm_x_2438mm" : 404341,
			"12mm_x_254mm_x_2438mm" : 404338,
			"12mm_x_305mm_x_2438mm" : 404338,
			"12mm_x_305mm_x_3360mm" : 404445
		}
	},
	"board_length" : { // in millimeters
		"9mm_x_254mm_x_2438mm" : 2438,
		"12mm_x_254mm_x_2438mm" : 2438,
		"12mm_x_305mm_x_2438mm" : 2438,
		"12mm_x_305mm_x_3360mm" : 3360
	},
	"fastener_type_for_board" : {
		"9mm_x_254mm_x_2438mm" : 400032, // product id
		"12mm_x_254mm_x_2438mm" : 400033,
		"12mm_x_305mm_x_2438mm" : 400033,
		"12mm_x_305mm_x_3360mm" : 400033
	},
	"fastener_type_for_timber" : 400036,
	"number_of_fasteners_per_board" : {
		"9mm_x_254mm_x_2438mm" : 14,
		"12mm_x_254mm_x_2438mm" : 14,
		"12mm_x_305mm_x_2438mm" : 14,
		"12mm_x_305mm_x_3360mm" : 18
	},
	"amount_of_sealant_per_board" : { // in mL
		"9mm_x_254mm_x_2438mm" : 6.75,
		"12mm_x_254mm_x_2438mm" : 9,
		"12mm_x_305mm_x_2438mm" : 10.8,
		"12mm_x_305mm_x_3360mm" : 10.8
	},
	"amount_of_sealant_in_tube": 300,
	"min_amount_of_sealant_for_using_tubes": 600
}

window.products_data = {
	// senepa 
	404341: {"name": "HardieFlex® Senepa 9mm x 254mm x 2438mm","cost": ""},
	404338: {"name": "HardieFlex® Senepa 12mm x 254mm x 2438mm","cost": ""},
	404337: {"name": "HardieFlex® Senepa 12mm x 305mm x 2438mm","cost": ""},
	404445: {"name": "HardieFlex® Senepa 12mm x305mm x 3660mm","cost": ""},

	// fasteners
	400032: {"name": "HardieFlex screw 8x25mm","cost": ""},
	400033: {"name": "HardieFlex screw 8x32mm","cost": ""},
	400036 : {"name": "HardieFlex Nail 2.30x32mm","cost": ""},
	
	// planks
	404375: {"name": "HardiePlank® Siding Select Cedar Mill 7.5mm x 208mm x 3656mm","cost": ""},
	404341: {"name": "HardiePlank® Siding Smooth 9mm x 254mm x 2438mm","cost": ""},
	
	// sealant
	'PU':{'name':'Polyurethane Sealant',								'unit':'300mL tube','cost':""},
	'PU ml':{'name':'Polyurethane Sealant',								'unit':'mL','cost':""},

}