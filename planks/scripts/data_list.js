window.list_data = {
	"step1_product": {
		"hardieflex_select_cedar_mill" : "HardiePlank Select Cedar Mill",
		"hardieflex_smooth" : "HardiePlank Smooth",
	},
	"step1_type_of_frame": {
		"steel_0.55_to_1.66mm_bmt" : "Steel 0.55 to 1.66 mm BMT",
		"timber" : "Timber",
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
		"hardieflex_select_cedar_mill" : 400012,
		"hardieflex_smooth": 400013 
	},
	"plank_length" : { // for planks
		"hardieflex_select_cedar_mill" : 0.699,
		"hardieflex_smooth": 0.558 
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
		"400_hardieflex_select_cedar_mill" : 13,
		"600_hardieflex_select_cedar_mill" : 10,
		"400_hardieflex_smooth" : 7,
		"600_hardieflex_smooth" : 6,
	},
	"amount_of_sealant_per_plank" : 200, // mL
	"amount_of_sealant_in_tube": 600
}

window.products_data = {
			// screws
	400042: {
		"name": "HardiePlank galvanised pointed screw w/plastic anchor 7x38mm",
		"cost": 1
	},
	400043: {
		"name": "HardiePlank screw 7x38mm",
		"cost": 1
	},
	400046 : {
		"name": "HardiePlank Nail 2.8x50mm",
		"cost": 1
	},
			// planks
	400012: {
		"name": "HardiePlank Select Cedar Mill",
		"cost": 10
	},
	400013: {
		"name": "HardiePlank Smooth",
		"cost": 15
	}
}