window.list_data = {
	"step1_product": {
		"hardieflex_sheet" : "HardiePlank Sheets",
		"hardieflex_pro" : "HardiePlank Pro"
	},
	"step1_type_of_frame": {
		"steel" : "Steel 0.55 to 1.66 mm BMT",
		"timber" : "Timber"
	},
	"step1_application": {
		'ceiling_uninsulated' : 'Ceiling uninsulated<600',
		'dry_wall' : 'Dry wall fastener only',
		'wet_area_wall' : 'Wet Area Wall (same as untiled)'
	},
	"step2_sheet_size": {
		'3.5mm_x_1219mm_x_2438mm': '3.5mm x 1219mm x 2438mm',
		'4.5mm_x_1219mm_x_2438mm': '4.5mm x 1219mm x 2438mm',
		'4.5mm_x_1200mm_x_2700mm': '4.5mm x 1200mm x 2700mm',
		'4.5mm_x_1200mm_x_3000mm': '4.5mm x 1200mm x 3000mm',
		'6mm_x_1219mm_x_2438mm': '6mm x 1219mm x 2438mm',
		'6mm_x_1200mm_x_2700mm': '6mm x 1200mm x 2700mm',
		'6mm_x_1200mm_x_3000mm': '6mm x 1200mm x 3000mm',
		'9mm_x_1219mm_x_2438mm': '9mm x 1219mm x 2438mm',
		'9mm_x_1200mm_x_2700mm': '9mm x 1200mm x 2700mm',
		'9mm_x_1200mm_x_3000mm': '9mm x 1200mm x 3000mm',
		'12mm_x_1219mm_x_2438mm': '12mm x 1219mm x 2438mm',
		'6mm_x_1250mm_x_2400mm': '6mm x 1250mm x 2400mm',
		'6mm_x_1200mm_x_2400mm': '6mm x 1200mm x 2400mm'
	},
	"step2_orientation": {
		'h' : 'Horizontal',
		'v' : 'Vertical'
	}
};


window.calculation_numbers = {
	"product_id" : { // matrix
		"hardieflex_sheet" : {
			'3.5mm_x_1219mm_x_2438mm': 404279,
			'4.5mm_x_1219mm_x_2438mm': 404264,
			'4.5mm_x_1200mm_x_2700mm': 400184,
			'4.5mm_x_1200mm_x_3000mm': 400182,
			'6mm_x_1219mm_x_2438mm': 404265,
			'6mm_x_1200mm_x_2700mm': 400169,
			'6mm_x_1200mm_x_3000mm': 400167,
			'9mm_x_1219mm_x_2438mm': 404267,
			'9mm_x_1200mm_x_2700mm': 404272,
			'9mm_x_1200mm_x_3000mm': 404271,
			'12mm_x_1219mm_x_2438mm': 404270
		},
		"hardieflex_pro": {
				'6mm_x_1250mm_x_2400mm': 404433,
				'6mm_x_1200mm_x_2400mm': 404594,
				'6mm_x_1200mm_x_2700mm': 404593,
				'6mm_x_1200mm_x_3000mm': 404438
		}
	},
	"fastener_type_for_frame" : {
		"steel_0.55_to_1.66mm_bmt" : 400043, // product id
		"timber" : 400046
	},
	'product_to_application': {
		"hardieflex_sheet" : ['ceiling_uninsulated','dry_wall','wet_area_wall'],
		"hardieflex_pro": ['ceiling_uninsulated','wet_area_wall']
	},
	"sheet_size" : {						// in square meters
		'3.5mm_x_1219mm_x_2438mm': 2.97,
		'4.5mm_x_1219mm_x_2438mm': 2.97,
		'4.5mm_x_1200mm_x_2700mm': 3.24,
		'4.5mm_x_1200mm_x_3000mm': 3.6,
		'6mm_x_1219mm_x_2438mm': 2.97,
		'6mm_x_1200mm_x_2700mm': 3.24,
		'6mm_x_1200mm_x_3000mm': 3.6,
		'9mm_x_1219mm_x_2438mm': 2.97,
		'9mm_x_1200mm_x_2700mm': 3.24,
		'9mm_x_1200mm_x_3000mm': 3.6,
		'12mm_x_1219mm_x_2438mm': 2.97,
		'6mm_x_1250mm_x_2400mm': 3,
		'6mm_x_1200mm_x_2400mm': 3
	},
	"sheet_width" : {						// in millimeters
		'3.5mm_x_1219mm_x_2438mm': 1219,
		'4.5mm_x_1219mm_x_2438mm': 1219,
		'4.5mm_x_1200mm_x_2700mm': 1200,
		'4.5mm_x_1200mm_x_3000mm': 1200,
		'6mm_x_1219mm_x_2438mm': 1219,
		'6mm_x_1200mm_x_2700mm': 1200,
		'6mm_x_1200mm_x_3000mm': 1200,
		'9mm_x_1219mm_x_2438mm': 1219,
		'9mm_x_1200mm_x_2700mm': 1200,
		'9mm_x_1200mm_x_3000mm': 1200,
		'12mm_x_1219mm_x_2438mm': 1219,
		'6mm_x_1250mm_x_2400mm': 1250,
		'6mm_x_1200mm_x_2400mm': 1200
	},
	"sheet_length" : {						// in millimeters
		'3.5mm_x_1219mm_x_2438mm': 2438,
		'4.5mm_x_1219mm_x_2438mm': 2438,
		'4.5mm_x_1200mm_x_2700mm': 2700,
		'4.5mm_x_1200mm_x_3000mm': 3000,
		'6mm_x_1219mm_x_2438mm': 2438,
		'6mm_x_1200mm_x_2700mm': 2700,
		'6mm_x_1200mm_x_3000mm': 3000,
		'9mm_x_1219mm_x_2438mm': 2438,
		'9mm_x_1200mm_x_2700mm': 2700,
		'9mm_x_1200mm_x_3000mm': 3000,
		'12mm_x_1219mm_x_2438mm': 2438,
		'6mm_x_1250mm_x_2400mm': 2400,
		'6mm_x_1200mm_x_2400mm': 2400
	},
	'product_application_to_size': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : [
				'3.5mm_x_1219mm_x_2438mm',
				'4.5mm_x_1219mm_x_2438mm',
				'6mm_x_1219mm_x_2438mm',
				'9mm_x_1219mm_x_2438mm'
			],
			'dry_wall' : [
				'4.5mm_x_1219mm_x_2438mm',
				'4.5mm_x_1200mm_x_2700mm',
				'4.5mm_x_1200mm_x_3000mm',
				'6mm_x_1219mm_x_2438mm',
				'6mm_x_1200mm_x_2700mm',
				'6mm_x_1200mm_x_3000mm',
				'9mm_x_1219mm_x_2438mm',
				'9mm_x_1200mm_x_2700mm',
				'9mm_x_1200mm_x_3000mm',
				'12mm_x_1219mm_x_2438mm'
			],
			'wet_area_wall' : [
				'6mm_x_1219mm_x_2438mm',
				'6mm_x_1200mm_x_2700mm',
				'6mm_x_1200mm_x_3000mm',
				'9mm_x_1219mm_x_2438mm',
				'9mm_x_1200mm_x_2700mm',
				'9mm_x_1200mm_x_3000mm',
				'12mm_x_1219mm_x_2438mm'
			]
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : [
				'6mm_x_1200mm_x_2400mm'
			],
			'dry_wall' : false,
			'wet_area_wall' : [
				'6mm_x_1250mm_x_2400mm',
				'6mm_x_1200mm_x_2700mm',
				'6mm_x_1200mm_x_3000mm'
			]
		}
	},
	'product_application_size_to_spacing': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': 406,
				'4.5mm_x_1219mm_x_2438mm': 406,
				'6mm_x_1219mm_x_2438mm': 406,
				'9mm_x_1219mm_x_2438mm': 406
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': 610,
				'4.5mm_x_1200mm_x_2700mm': 600,
				'4.5mm_x_1200mm_x_3000mm': 600,
				'6mm_x_1219mm_x_2438mm': 610,
				'6mm_x_1200mm_x_2700mm': 600,
				'6mm_x_1200mm_x_3000mm': 600,
				'9mm_x_1219mm_x_2438mm': 610,
				'9mm_x_1200mm_x_2700mm': 600,
				'9mm_x_1200mm_x_3000mm': 600,
				'12mm_x_1219mm_x_2438mm': 610
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': 406,
				'6mm_x_1200mm_x_2700mm': 400,
				'6mm_x_1200mm_x_3000mm': 400,
				'9mm_x_1219mm_x_2438mm': 406,
				'9mm_x_1200mm_x_2700mm': 400,
				'9mm_x_1200mm_x_3000mm': 400,
				'12m_x_1219mm_x_2438mm': 406
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': 400
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': 400,
				'6mm_x_1200mm_x_2700mm': 400, 
				'6mm_x_1200mm_x_3000mm': 400
			}
		}
	},
	'product_application_size_to_orientation': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': ['h','v'],
				'4.5mm_x_1219mm_x_2438mm': ['h','v'],
				'6mm_x_1219mm_x_2438mm': ['h','v'],
				'9mm_x_1219mm_x_2438mm': ['h','v']
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': ['h','v'],
				'4.5mm_x_1200mm_x_2700mm': ['v'],
				'4.5mm_x_1200mm_x_3000mm': ['v'],
				'6mm_x_1219mm_x_2438mm': ['h','v'],
				'6mm_x_1200mm_x_2700mm': ['v'],
				'6mm_x_1200mm_x_3000mm': ['v'],
				'9mm_x_1219mm_x_2438mm': ['h','v'],
				'9mm_x_1200mm_x_2700mm': ['v'],
				'9mm_x_1200mm_x_3000mm': ['v'],
				'12mm_x_1219mm_x_2438mm': ['h','v']
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': ['h','v'],
				'6mm_x_1200mm_x_2700mm': ['v'],
				'6mm_x_1200mm_x_3000mm': ['v'],
				'9mm_x_1219mm_x_2438mm': ['v'],
				'9mm_x_1200mm_x_2700mm': ['v'],
				'9mm_x_1200mm_x_3000mm': ['v'],
				'12m_x_1219mm_x_2438mm': ['h','v']
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': ['h','v']
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': ['h'],
				'6mm_x_1200mm_x_2700mm': ['v'],
				'6mm_x_1200mm_x_3000mm': ['v']
			}
		}
	},	
	'product_application_size_frame_type_to_fastener_type': {
		"timber": { 
			"hardieflex_sheet" : {
				'ceiling_uninsulated' : {
					'3.5mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'4.5mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long'
				},
				'dry_wall' : {
					'4.5mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'4.5mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'4.5mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long',
					'12mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long'
				},
				'wet_area_wall' : {
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'9mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long',
					'12m_x_1219mm_x_2438mm': 'HardieDrive Nails 32mm long'
				}
			},
			"hardieflex_pro": {
				'ceiling_uninsulated' : {
					'6mm_x_1200mm_x_2400mm': 'HardieDrive Nails 32mm long'
				},
				'dry_wall' : false,
				'wet_area_wall' : {
					'6mm_x_1250mm_x_2400mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Nails 32mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Nails 32mm long'
				}
			}
		},
		"steel": { 
			"hardieflex_sheet" : {
				'ceiling_uninsulated' : {
					'3.5mm_x_1219mm_x_2438mm': 'HardieDrive Screws 20mm long',
					'4.5mm_x_1219mm_x_2438mm': 'HardieDrive Screws 20mm long',
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long'
				},
				'dry_wall' : {
					'4.5mm_x_1219mm_x_2438mm': 'HardieDrive Screws 20mm long',
					'4.5mm_x_1200mm_x_2700mm': 'HardieDrive Screws 20mm long',
					'4.5mm_x_1200mm_x_3000mm': 'HardieDrive Screws 20mm long',
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1200mm_x_2700mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1200mm_x_3000mm': 'HardieDrive Screws 25mm long',
					'12mm_x_1219mm_x_2438mm': 'HardieDrive Screws 32mm long'
				},
				'wet_area_wall' : {
					'6mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1219mm_x_2438mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1200mm_x_2700mm': 'HardieDrive Screws 25mm long',
					'9mm_x_1200mm_x_3000mm': 'HardieDrive Screws 25mm long',
					'12m_x_1219mm_x_2438mm': 'HardieDrive Screws 32mm long'
				}
			},
			"hardieflex_pro": {
				'ceiling_uninsulated' : {
					'6mm_x_1200mm_x_2400mm': 'HardieDrive Screws 25mm long'
				},
				'dry_wall' : false,
				'wet_area_wall' : {
					'6mm_x_1250mm_x_2400mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_2700mm': 'HardieDrive Screws 25mm long',
					'6mm_x_1200mm_x_3000mm': 'HardieDrive Screws 25mm long'
				}
			}
		}
	},
	'product_application_size_to_paper_tape': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'4.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm'
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'4.5mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'4.5mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'6mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'6mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm',
				'9mm_x_1200mm_x_2700mm': 'Villaboard 9mm x 1200mm 2700mm',
				'9mm_x_1200mm_x_3000mm': 'Villaboard 9mm x 1200mm x 3000mm',
				'12mm_x_1219mm_x_2438mm': 'Villaboard 12mm x 1200mm x 2400mm'
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm 1200mm x 2400mm',
				'6mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'6mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm',
				'9mm_x_1200mm_x_2700mm': 'Villaboard 9mm x 1200mm 2700mm',
				'9mm_x_1200mm_x_3000mm': 'Villaboard 9mm x 1200mm x 3000mm',
				'12m_x_1219mm_x_2438mm': 'Villaboard 12mm x 1200mm x 2400mm'
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': 'Villaboard 6mm x 1200mm x2400mm'
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': 'Villaboard 6mm x 1200mm x2400mm',
				'6mm_x_1200mm_x_2700mm': '',
				'6mm_x_1200mm_x_3000mm': ''
			}
		}
	},
	'product_application_size_to_putty_amount': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': 0.8,
				'4.5mm_x_1219mm_x_2438mm': 0.8,
				'6mm_x_1219mm_x_2438mm': 0.8,
				'9mm_x_1219mm_x_2438mm': 0.8
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': 0.8,
				'4.5mm_x_1200mm_x_2700mm': 0.8,
				'4.5mm_x_1200mm_x_3000mm': 0.8,
				'6mm_x_1219mm_x_2438mm': 0.8,
				'6mm_x_1200mm_x_2700mm': 0.8,
				'6mm_x_1200mm_x_3000mm': 0.8,
				'9mm_x_1219mm_x_2438mm': 0.8,
				'9mm_x_1200mm_x_2700mm': 0.8,
				'9mm_x_1200mm_x_3000mm': 0.8,
				'12mm_x_1219mm_x_2438mm': 0.8
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': 0.8,
				'6mm_x_1200mm_x_2700mm': 0.8,
				'6mm_x_1200mm_x_3000mm': 0.8,
				'9mm_x_1219mm_x_2438mm': 0.8,
				'9mm_x_1200mm_x_2700mm': 0.8,
				'9mm_x_1200mm_x_3000mm': 0.8,
				'12m_x_1219mm_x_2438mm': 0.8
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': 0.8
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': 0.8,
				'6mm_x_1200mm_x_2700mm': 0.8,
				'6mm_x_1200mm_x_3000mm': 0.8
			}
		}
	},
	'product_application_size_spacing_to_fasteners_per_sheet': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 120,
							'steel': 60
						},
						'h' : {
							'timber': 127,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'4.5mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 120,
							'steel': 60
						},
						'h' : {
							'timber': 127,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 120,
							'steel': 60
						},
						'h' : {
							'timber': 127,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 120,
							'steel': 60
						},
						'h' : {
							'timber': 66,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				}
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					}
				},
				'4.5mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': 60,
							'steel': 60
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'4.5mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
							}
					},
					'600_610': {
						'v' : {
							'timber': 63,
							'steel': 63
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					}
				},
				'6mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': 60,
							'steel': 60
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': 63,
							'steel': 63
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					},
					'600_610': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					}
				},
				'9mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': 60,
							'steel': 60
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': 63,
							'steel': 63
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'12mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					},
					'600_610': {
						'v' : {
							'timber': 55,
							'steel': 55
						},
						'h' : {
							'timber': 55,
							'steel': 55
						}
					}
				}
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 66,
							'steel': 66
						},
						'h' : {
							'timber': 66,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': 74,
							'steel': 74
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': 78,
							'steel': 78
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 66,
							'steel': 66
						},
						'h' : {
							'timber': 66,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'9mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'12m_x_1219mm_x_2438mm': {
					'400_406': {
						'v' : {
							'timber': 66,
							'steel': 66
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				}
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': {
					'400_406': {
						'v' : {
							'timber': 60,
							'steel': 60
						},
						'h' : {
							'timber': 66,
							'steel': 66
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				}
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': {
					'400_406': {
						'v' : {
							'timber': 66,
							'steel': 66
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1200mm_x_2700mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				},
				'6mm_x_1200mm_x_3000mm': {
					'400_406': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					},
					'600_610': {
						'v' : {
							'timber': false,
							'steel': false
						},
						'h' : {
							'timber': false,
							'steel': false
						}
					}
				}
			}
		}
	},
	'product_application_size_to_sealant_amount': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': 0,
				'4.5mm_x_1219mm_x_2438mm': 0,
				'6mm_x_1219mm_x_2438mm': 0,
				'9mm_x_1219mm_x_2438mm': 0
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': 0.027,
				'4.5mm_x_1200mm_x_2700mm': 0.027,
				'4.5mm_x_1200mm_x_3000mm': 0.027,
				'6mm_x_1219mm_x_2438mm': 0.036,
				'6mm_x_1200mm_x_2700mm': 0.036,
				'6mm_x_1200mm_x_3000mm': 0.036,
				'9mm_x_1219mm_x_2438mm': 0.054,
				'9mm_x_1200mm_x_2700mm': 0.054,
				'9mm_x_1200mm_x_3000mm': 0.054,
				'12mm_x_1219mm_x_2438mm': 0.072
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': 0.036,
				'6mm_x_1200mm_x_2700mm': 0.036,
				'6mm_x_1200mm_x_3000mm': 0.036,
				'9mm_x_1219mm_x_2438mm': 0.054,
				'9mm_x_1200mm_x_2700mm': 0.054,
				'9mm_x_1200mm_x_3000mm': 0.054,
				'12m_x_1219mm_x_2438mm': 0.072
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': 0
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': 0.036,
				'6mm_x_1200mm_x_2700mm': 0.036,
				'6mm_x_1200mm_x_3000mm': 0.036
			}
		}
	},
	'product_application_size_to_control_joints': {
		"hardieflex_sheet" : {
			'ceiling_uninsulated' : {
				'3.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'4.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm'
			},
			'dry_wall' : {
				'4.5mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'4.5mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'4.5mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm x 1200mm x 2400mm',
				'6mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'6mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm',
				'9mm_x_1200mm_x_2700mm': 'Villaboard 9mm x 1200mm 2700mm',
				'9mm_x_1200mm_x_3000mm': 'Villaboard 9mm x 1200mm x 3000mm',
				'12mm_x_1219mm_x_2438mm': 'Villaboard 12mm x 1200mm x 2400mm'
			},
			'wet_area_wall' : {
				'6mm_x_1219mm_x_2438mm': 'Villaboard 6mm 1200mm x 2400mm',
				'6mm_x_1200mm_x_2700mm': 'Villaboard 6mm x 1200mm x 2700mm',
				'6mm_x_1200mm_x_3000mm': 'Villaboard 6mm x 1200mm x 3000mm',
				'9mm_x_1219mm_x_2438mm': 'Villaboard 9mm x 1200mm x 2400mm',
				'9mm_x_1200mm_x_2700mm': 'Villaboard 9mm x 1200mm 2700mm',
				'9mm_x_1200mm_x_3000mm': 'Villaboard 9mm x 1200mm x 3000mm',
				'12m_x_1219mm_x_2438mm': 'Villaboard 12mm x 1200mm x 2400mm'
			}
		},
		"hardieflex_pro": {
			'ceiling_uninsulated' : {
				'6mm_x_1200mm_x_2400mm': 'Villaboard 6mm x 1200mm x2400mm'
			},
			'dry_wall' : false,
			'wet_area_wall' : {
				'6mm_x_1250mm_x_2400mm': 'Villaboard 6mm x 1200mm x2400mm',
				'6mm_x_1200mm_x_2700mm': '',
				'6mm_x_1200mm_x_3000mm': ''
			}
		}
	},
	'product_amount_to_id': {
		'fastener': {
			'HardieDrive Nails 32mm long': {
				'1100': 'JH Nail Kilo',
				'27500': '305436'
			},
			'HardieDrive Screws 20mm long': {
				'70': '305757',
				'1000': '305759'
			},
			'HardieDrive Screws 25mm long': {
				'70': '305760',
				'1000': '305761'
			},
			'HardieDrive Screws 32mm long': {
				'70': '305768',
				'1000': '305769'
			}
		}
	},
	"amount_of_paper_per_roll" : 76, // m
	"amount_of_putty_per_pail" : 25, // kg
	"amount_of_sealant_per_plank" : 200, // mL
	"amount_of_sealant_in_tube": 300 // ml
};

window.products_data = {
	// sheets
	'404279':{'name':'HardieFlex® Sheet 3.5mm x 1219mm x 2438mm','cost':""},
	'404264':{'name':'HardieFlex® Sheet 4.5mm x 1219mm x 2438mm','cost':""},
	'400184':{'name':'HardieFlex® Sheet 4.5mm x 1200mm x 2700mm','cost':""},
	'400182':{'name':'HardieFlex® Sheet 4.5mm x 1200mm x 3000mm','cost':""},
	'404265':{'name':'HardieFlex® Sheet 6mm x 1219mm x 2438mm','cost':""},
	'400169':{'name':'HardieFlex® Sheet 6mm x 1200mm x 2700mm','cost':""},
	'400167':{'name':'HardieFlex® Sheet 6mm x 1200mm x 3000mm','cost':""},
	'404267':{'name':'HardieFlex® Sheet 9mm x 1219mm x 2438mm','cost':""},
	'404272':{'name':'HardieFlex® Sheet 9mm x 1200mm x 2700mm','cost':""},
	'404271':{'name':'HardieFlex® Sheet 9mm x 1200mm x 3000mm','cost':""},
	'404270':{'name':'HardieFlex® Sheet 12mm x 1219mm x 2438mm','cost':""},
	'404433':{'name':'HardieFlex® Pro 6mm x 1250mm x 2400mm','cost':""},
	'404594':{'name':'HardieFlex® Pro 6mm x 1200mm x 2400mm','cost':""},
	'404593':{'name':'HardieFlex® Pro 6mm x 1200mm x 2700mm','cost':""},
	'404438':{'name':'HardieFlex® Pro 6mm x 1200mm x 3000mm','cost':""},
	'404341':{'name':'HardieFlex® Senepa 9mm x 254mm x 2438mm','cost':""},
	'404338':{'name':'HardieFlex® Senepa 12mm x 254mm x 2438mm','cost':""},
	'404337':{'name':'HardieFlex® Senepa 12mm x 305mm x 2438mm','cost':""},
	'404445':{'name':'HardieFlex® Senepa 12mm x 305mm x 3660mm','cost':""},
	'404375':{'name':'HardiePlank® Siding Select Cedar Mill 7.5mm x 208mm x 3656mm','cost':""},
	'404673':{'name':'HardieFlex® Flooring 16mm x 600mm x 2400mm','cost':""},
	'404658':{'name':'HardieFlex® Flooring 16mm x 1200mm x 2400mm','cost':""},

	// fasteners
	
	'305436':{'name':'HardieDrive® Nails',							'unit':'25 Kg box','cost':""},
	'JH Nail Kilo':{'name':'HardieDrive® Nails',					'unit':'per Kg','cost':""},
	'305757':{'name':'HardieDrive® Screw 20mm long Retail Pack',	'unit':'70\'s pack','cost':""},
	'305759':{'name':'HardieDrive® Screw 20mm long Wholesale Pack',	'unit':'1000\'s pack','cost':""},
	'305760':{'name':'HardieDrive® Screw 25mm long Retail Pack',	'unit':'70\'s pack','cost':""},
	'305761':{'name':'HardieDrive® Screw 25mm long Wholesale Pack',	'unit':'1000\'s pack','cost':""},
	'305768':{'name':'HardieDrive® Screw 32mm long Retail Pack',	'unit':'70\'s pack','cost':""},
	'305769':{'name':'HardieDrive® Screw 32mm long Wholesale Pack',	'unit':'1000\'s pack','cost':""},

	// paper tape
	'305440':{'name':'HardieFlex® Perforated Paper Tape',			'unit':'250 ft per roll','cost':""},

	// putty
	'305470':{'name':'HardieFlex® Putty',							'unit':'25 Kg. pail','cost':""},			

	// sealant
	'PU':{'name':'Polyurethane Sealant',						'unit':'300ml tube','cost':""},
				


};
