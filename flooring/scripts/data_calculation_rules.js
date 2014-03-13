window.calculation_rules =  {
	"number_of_sheets" : function() {
		var total_area_size = parseFloat($("#step2\\[total_area_size\\]").val());
		var waste = parseFloat($("#step1\\[waste\\]").val());
		var sheet_type = $("#step1\\[sheet_size\\]").val();
		var sheet_area = window.sheet_size[sheet_type];
		
		// number_of_sheets = Floor area / Sheet area  * (wastage + 100)/100
		var number_of_sheets = (total_area_size / sheet_area) * ((waste + 100) / 100);
		
		return Math.ceil(number_of_sheets);
	},
	"number_of_fasteners": function() {
		var sheet_type = $("#step1\\[sheet_size\\]").val();	
		var number_of_sheets = $("#step3\\[number_of_sheets\\]").val();	
		var number_of_fasteners = window.number_of_fasteners_per_sheet[sheet_type] * number_of_sheets;
		return number_of_fasteners;
	},
	"amount_of_epoxy": function() {
		var sheet_type = $("#step1\\[sheet_size\\]").val();	
		var number_of_sheets = $("#step3\\[number_of_sheets\\]").val();	
		var amount_of_epoxy = window.amount_of_epoxy_per_sheet[sheet_type] * number_of_sheets;
		
		if (amount_of_epoxy > 1000) {
			amount_of_epoxy = Math.ceil(amount_of_epoxy / 1000);
			$("#units_amount_of_epoxy").html("L");
			$("#step3\\[amount_of_epoxy_units\\]").val("L");
		}
		else {
			$("#units_amount_of_epoxy").html("mL");
			$("#step3\\[amount_of_epoxy_units\\]").val("mL");
		}
		
		return amount_of_epoxy;
	},
	"amount_of_constr_adhesive": function() {
		var sheet_type = $("#step1\\[sheet_size\\]").val();	
		var number_of_sheets = $("#step3\\[number_of_sheets\\]").val();	
		var amount_of_constr_adhesive = window.amount_of_constr_adhesive_per_sheet[sheet_type] * number_of_sheets;
		
		if (amount_of_constr_adhesive > 300) {
			amount_of_constr_adhesive = Math.ceil(amount_of_constr_adhesive / 300);
			$("#units_amount_of_constr_adhesive").html("tubes");
			$("#step3\\[amount_of_constr_adhesive_units\\]").val("tubes");
		}
		else {
			$("#units_amount_of_constr_adhesive").html("mL");
			$("#step3\\[amount_of_constr_adhesive_units\\]").val("mL");
		}
		
		return amount_of_constr_adhesive;
	},
};


