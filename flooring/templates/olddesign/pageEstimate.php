<div id="projectData" style="display:none"><?php echo($project['project_data']); ?></div>
<div id="middle_wrapper">
	<form id="estimationForm" method="post" action="index.php?route=report">
		<input type="hidden" name="project_id" value="<?php echo $project['project_id']; ?>">
		<input type="hidden" name="manager_name" value="<?php echo $project['manager_name']; ?>">
		<input type="hidden" name="project_type" id="project_type" value="flooring" />
		<input type="hidden" name="report_type" id="report_type" value="excel">
		<input type="hidden" name="project_data" id="project_data" value='<?php echo(addslashes($project['project_data'])); ?>'>

		<div id="estimation_left_table">
			<p>Project Estimation</p>
			<table id="estimation_values">
				<thead>
					<tr>
						<th>Field</th>
						<th>Value</th>
						<th>Units</th>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot>
					<tr>
						<td>Product Estimation</td>
						<td id="product_estimation"></td>
						<td>m2</td>
					</tr>
				</tfoot>
			</table>
		</div>

		<div id="estimation_right_table" >
			<table id="project_data">
				<tr>
					<td width="57%">Project Address <input id="project[address]" name="project[address]" type="text" value="" size="29"/></td>
					<td>Date <input id="project[date]" name="project[date]" type="text" value="" size="7"</td>
					<td>Postcode <input id="project[postcode]" name="project[postcode]" type="text" value="" size="7"</td>
				</tr>
			</table>
		</div>

		<div id="estimation_low_right_table" >
			<div id="bill_header">
				<div class="header2">Bill of Quantities</div>
				<div id="quantities_buttons">
					<a href="javascript:return 0;" class="bill_header_link_button" id="button_hide_cost">HIDE COST/UNIT</a>
					<a href="javascript:return 0;" class="bill_header_link_button" id="button_show_cost">SHOW COST/UNIT</a>
					<a href="javascript:return 0;" class="bill_header_link_button" id="button_add_item">ADD ITEM</a>
				</div>
			</div>
			<table id="bill_of_quantities">
				<thead>
					<tr>
						<th>ID Number</th>
						<th>Description</th>
						<th>Qty</th>
						<th>Unit</th>
						<th class="cost_unit">Cost/Unit</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				</tbody>
				<tfoot>
						<td colspan="2">Total cost ($) per sqm: <input id="total_cost_per_sqm" type="text" value="" size="5"/></td>
						<td colspan="4">Total cost ($): <input id="total_cost" type="text" value="" size="5"/></td>
				</tfoot>
			</table>
		</div>

		<div id="estimation_low_left_table" >
			<p>Calculate labour rates</p>
			<table id="labour_rates_data">
				<thead>
					<tr>
						<th>Item</th>
						<th style="width:80px">Rate per m2</th>
					</tr>
				</thead>
				<tbody>
					<tr class="labour_item">
						<td>Flooring</td>
						<td><input id="labour[flooring]" name="labour[flooring]" type="text" value="10" size="5"/></td>
					</tr>
					<tr class="labour_item">
						<td>Floor finish</td>
						<td><input id="labour[floor_finish]" name="labour[floor_finish]" type="text" value="5" size="5"/></td>
					</tr>
					<tr class="labour_item">
						<td>Subtotal</td>
						<td><input id="labour[subtotal]" name="labour[subtotal]" type="text" value="" size="5"/></td>
					</tr>
				</tbody>			
			</table>
		</div>

		<div id="estimation_reports_table" >
			<table>
				<thead>
					<tr>
						<th>Bill of quantities</th>
						<th style="width:180px"></th>
					</tr>
				</thead>
				<tbody>
					<tr class="labour_item">
						<td>Click to download in these formats:</td>
						<td>
							<a href="javascript:return 0;" class="make_report_button" id="word">WORD</a>
							<a href="javascript:return 0;" class="make_report_button" id="excel">EXCEL</a>
						</td>
					</tr>
				</tbody>			
			</table>
		</div>
	</form>
</div>


<div id="templates" style="display:none">
	<table id="template_add_bill_item">
		<tbody>
			<tr class="bill_item">
				<td><input class="bill_item_id" number="_ID_" id="bill[_ID_][id_number]" name="bill[_ID_][id_number]" type="text" value="" size="10"/></td>
				<td><input id="bill[_ID_][description]" name="bill[_ID_][description]" type="text" value="" size="24"/></td>
				<td><input class="bill_item_quantity" name="bill[_ID_][quantity]" id="bill[_ID_][quantity]" type="text" value="" size="5"/></td>
				<td><input id="bill[_ID_][unit]" name="bill[_ID_][unit]"  type="text" value="" size="5"/></td>
				<td><input class="bill_item_cost" id="bill[_ID_][cost_unit]" name="bill[_ID_][cost_unit]" type="text" value="" size="5"/></td>
				<td><input class="bill_delete_button" type="button" name="bill[_ID_][delete]" id="bill[_ID_][delete]" value="CLEAR" /></td>
			</tr>
		</tbody>
	</table>
</div>