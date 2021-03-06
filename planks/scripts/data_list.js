window.list_data = {
	"step1_product": {
		"hardieplank_select_cedar_mill" : "HardiePlank Select Cedar Mill",
		"hardieplank_smooth" : "HardiePlank Smooth",
	},
	"step1_type_of_frame": {
		"steel_0.55_to_1.66mm_bmt" : "Steel 0.55 to 1.66 mm BMT",
		//"timber" : "Timber",
		"masonry_substrate" : "Masonry Substrate"
	},
	"step1_wind_zone": {
		"1_up_to_9m" : "I (up to 9m )",
		"2_up_to_18m" : "II (up to 18m )",
		"3_up_to_18m" : "III (up to 18m )",
	}
};

window.calculation_numbers = {
	"product_id" : { // planks
		"hardieplank_select_cedar_mill" : 404375,
		"hardieplank_smooth": 404341 
	},
	"plank_length" : { // for planks
		"hardieplank_select_cedar_mill" : 0.699,
		"hardieplank_smooth": 0.558 
	},
	"fastener_type_for_frame" : {
		"steel_0.55_to_1.66mm_bmt" : 400043, // product id
		"timber" : 400046,
		"masonry_substrate" : 400042
	},
	"spacing_for_wind_zone": { // in mm
		"1_up_to_9m" : 400,
		"2_up_to_18m" : 400,
		"3_up_to_18m" : 600
	},
	"number_of_fasteners_per_spacing_and_plank" : {
		"400_hardieplank_select_cedar_mill" : 13,
		"600_hardieplank_select_cedar_mill" : 10,
		"400_hardieplank_smooth" : 7,
		"600_hardieplank_smooth" : 6,
	},
	"amount_of_sealant_per_plank" : 200, // mL
	"amount_of_sealant_in_tube": 300,
	"min_amount_of_sealant_for_using_tubes": 600
}

window.products_data = {
	// screws
	400042: {"name": "HardiePlank galvanised pointed screw w/plastic anchor 7x38mm","cost": ""},
	400043: {"name": "HardiePlank screw 7x38mm","cost": ""},
	400046 : {"name": "HardiePlank Nail 2.8x50mm","cost": ""},
	
	// planks
	404375: {"name": "HardiePlank® Siding Select Cedar Mill 7.5mm x 208mm x 3656mm","cost": ""},
	404341: {"name": "HardiePlank® Siding Smooth 9mm x 254mm x 2438mm","cost": ""},
	
	// sealant
	'PU':{'name':'Polyurethane Sealant',								'unit':'300mL tube','cost':""},
	'PU ml':{'name':'Polyurethane Sealant',								'unit':'mL','cost':""},

}