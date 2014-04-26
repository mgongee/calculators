<div id="projectData" style="display:none"><?php echo($project['project_data']); ?></div>
<div id="middle_wrapper">
	<form id="estimationForm" method="post" action="index.php?route=report">
		<input type="hidden" name="project_id" id="project_id" value="<?php echo $project['project_id']; ?>">
		<input type="hidden" name="user_name" value="<?php echo $user_name; ?>">
		<input type="hidden" name="user_email" value="<?php echo $user_email; ?>">
		<input type="hidden" name="project_type" id="project_type" value="flooring" />
		<input type="hidden" name="report_type" id="report_type" value="excel">
		<input type="hidden" name="project_data" id="project_data" value='<?php echo($project['project_data']); ?>'>

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

		<div id="cost_library" >
			<table id="cost_table">
				<tr>
					<td width="44%">Select Cost Library: 
						<select id="cost_library_id" name="cost_library_id">
							<option value="0">Please select</option>");
							<?php
							foreach ($costLibraries as $libraryId => $libraryName) {
								echo ("<option value=\"$libraryId\">$libraryName</option>");
							}
							?>
						</select>
					</td>
					<td>
						Project Name: <input id="new_name" name="new_name" type="text" value="<?php echo $project['project_name']; ?>" size="7">
					</td>
					<td>
						<a href="javascript:return 0;" class="project_action_button" id="saveas">SAVE AS</a>
						<a href="javascript:return 0;" class="project_action_button" id="delete">DELETE</a>
					</td>
				</tr>
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

		<div id="estimation_low_right_table" class="scrolling" >
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
						<td colspan="2">Total cost (php) per sqm: <input id="total_cost_per_sqm" name="total_cost_per_sqm" type="text" value="" size="5"/></td>
						<td colspan="4">Total cost (php): <input id="total_cost" name="total_cost" type="text" value="" size="5"/></td>
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

		<div id="estimation_link_icons" >
			<table width="345" border="0" cellpadding="2" cellspacing="2">
			  <tr>
				<td><a href="index.php" onMouseOver="MM_swapImage('Another','','images/doAnotherCalc_r.jpg',1)" onMouseOut="MM_swapImgRestore()"><img src="images/doAnotherCalc.jpg" alt="AnotherCalc" name="Another" width=96 height=48 border=0></a></td> 
				<!-- <td><a href='#' onMouseOut='MM_swapImgRestore()' onMouseOver="MM_swapImage('Image18x','','images/Agility_r.jpg',1)"><img src='images/Agility.jpg' alt='Send' name='Image18x' width=96 height=48 border=0></a></td> -->
				<td><a href="#" id="send_request_button" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image18','','images/reqQuote_r.jpg',1)"><img src="images/reqQuote.jpg" alt="Send" name="Image18" width=96 height=48 border=0></a></td>
				<td><a href="../weatherboard/product_form.php" onMouseOver="MM_swapImage('CostLibrary','','images/costLib_r.jpg',1)" onMouseOut="MM_swapImgRestore()" target="_blank" ><img src="images/costLib.jpg" alt="CostLibrary" name="CostLibrary" width=96 height=48 border=0></a></td>
			  </tr>
			</table>
		</div>
		
		<div id="estimation_note">
			<img height="80" src="images/note.jpg">
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
	
	<div class="col-lg-4">
		<a class="button_back2" href="index.php?route=edit&id=<?php echo $project['project_id']; ?>"  id="go_to_edit">&nbsp;</a>
	</div>

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
				<td><a class="bill_delete_button" href="javascript:;" id="bill[_ID_][delete]" >CLEAR</a></td>
			</tr>
		</tbody>
	</table>
</div>

<div id="send_request_popup" >
	<div id="divId" title="SEND ORDER">
		<iframe name="formFrame" id="modalIframeId"  z-index=99 width="0" height="480" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="no"   title="Dialog Title">Your browser does not support</iframe>
	</div>
</div>