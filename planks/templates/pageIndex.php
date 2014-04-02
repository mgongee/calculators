<div>
	<img width="1000" border="0" alt="" src="templates/images/floor_strip.jpg">
</div>
<div id="middle-wrapper-div">
	<div id="Step1main" style="position: absolute; left: 53px; top: 278px">
		<table width="1000" cellspacing="0" cellpadding="0" border="0">
		<tbody>
			<tr>
				<td valign="top" align="left" height="240">
					<img id="bg_img" src="images/Step1_bg_floor.jpg" width="1000" alt="" border="0" usemap="#step_map"/>
					<map name="step_map">
						<area shape="rect" coords="69,44,122,60" href="step1" alt="Step 1">
						<area shape="rect" coords="123,44,179,60" href="step2" alt="Step 2">
						<area shape="rect" coords="180,44,240,60" href="step3" alt="Step 3">
					</map> 
				</td>
			</tr>
		</tbody>
		</table>
	</div>
	<div id="step1_banner">
		<p align="center"> <img width="313" border="0" height="99" alt="click left" src="images/Step1_icon.jpg">  </p>
	</div>
	<div id="step_layer" style="visibility: visible;">
		<div id="load_projects">
			<div style="color:#ffffff;margin-bottom: 10px;	" class="Product_headings">Load Existing Project</div>
			<select id="load_project_id" style="width:370px; font-size:12px;" name="load_project_id">
				<option value="">Please select previously saved files</option>");
				<?php
				foreach ($projectList as $projectId => $projectName) {
					echo ("<option value=\"$projectId\">$projectName</option>");
				}
				?>
			</select>
		</div>

		<form id="calcForm" method="post" action="index.php">
			<input type="hidden" name="manager_name" value="<?php echo $manager_name?>">
			<input type="hidden" name="project_type" id="project_type" value="planks" />
			<input type="hidden" name="action" id="action" value="save">

			<div id="fieldWrapper">
			</div>
			<div id="navigation" style="padding-top:40px;clear:both"> 							
				<div class="col-lg-4">
					<input class="navigation_button button_back" id="back" value="" style="display:none" type="reset" />
				</div>
				<div class="col-lg-4">
					<input class="navigation_button button_forward" id="next" value="" type="submit" />
				</div>
			</div>
			<p id="data"></p>
		</form>
	</div>
</div><!-- /#middle-wrapper-div -->


<!--
	Note: 
	in order to be correctly processed by "calculate_length_size" function,fields
		"add_length[...]"
	and 
		"_STEP_[_FIELDNAME_][_ID_][...]"
	
	must match the following rules:

	1) to have IDs that end with [length]
	2) to have classes "length_size"

-->
<div id="templates" style="display:none">
	<div id="template_step2">
		<div class="col50 add_wall_form">
			<h3>Add walls</h3>
			<div class="form-group col-area">
				<label class="input-label" for="add_wall[width]">Height/Width (mm)</label>
				<input class="wall_width" name="add_wall[width]" id="add_wall[width]" size="10" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_wall[length]">Length (mm)</label>
				<input class="wall_length" name="add_wall[length]" id="add_wall[length]" size="10" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_wall[size]">or Size (m2)</label>
				<input class="wall_size" name="add_wall[size]" id="add_wall[size]" size="10" />
			</div>
			<div class="col-area centered">
				<a id="add_wall_button" href="#"><img width="110" border="0" height="21" name="add_wall_img" alt="Add wall" src="images/ADDAREAlrga.jpg"></a>
			</div>		
		</div>
		<div class="col50 scrolling" style="height:200px;">
			<table id="add_walls_target" class="walls_table field_text">
				<thead>
					<tr>
						<th>#</th>
						<th>Width (mm)</th>
						<th>Length (mm)</th>
						<th>Total Area (m2)</th>
						<th></th>
					</tr>
				</thead>
				<tbody class="walls"></tbody>
				<tfoot>
					<tr>
						<th colspan="3">Total area (m2)</th>
						<th>
							<input class="total_wall_area" size="7" type="text" name="step2[total_wall_area]" id="step2[total_wall_area]" value="" />
						</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<div id="template_step3">
		<div class="col50 add_gable_form">
			<h3>Add gables</h3>
			<div class="form-group col-area">
				<label class="input-label" for="add_gable[base]">Base (mm)</label>
				<input class="gable_base" name="add_gable[base]" id="add_gable[base]" size="10" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_gable[height]">Height (mm)</label>
				<input class="gable_height" name="add_gable[height]" id="add_gable[height]" size="10" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_gable[size]">or Size (m2)</label>
				<input class="gable_size" name="add_gable[size]" id="add_gable[size]" size="10" />
			</div>
			<div class="col-area centered">
				<a id="add_gable_button" href="#"><img width="110" border="0" height="21" name="add_gable_img" alt="Add gable" src="images/ADDAREAlrga.jpg"></a>
			</div>		
		</div>
		<div class="col50 scrolling" style="height:200px;">
			<table id="add_gables_target" class="gables_table field_text">
				<thead>
					<tr>
						<th>#</th>
						<th>Base (mm)</th>
						<th>Height (mm)</th>
						<th>Total Area (m2)</th>
						<th></th>
					</tr>
				</thead>
				<tbody  class="gables"></tbody>
				<tfoot>
					<tr>
						<th colspan="3">Total area (m2)</th>
						<th>
							<input class="total_gable_area" size="7" type="text" name="step3[total_gable_area]" id="step3[total_gable_area]" value="" />
						</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<table id="template_addwall">
		<tbody>
			<tr class="wall_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][width]">_LABEL_</label>
				</td>
				<td>
					<input number="_ID_" class="wall_width" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][width]" id="_STEP_[_FIELDNAME_][_ID_][width]" value="_WIDTH_"/>
				</td>
				<td>
					<input class="wall_length" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][length]" id="_STEP_[_FIELDNAME_][_ID_][length]" value="_LENGTH_" />
				</td>
				<td>
					<input class="wall_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][size]" id="_STEP_[_FIELDNAME_][_ID_][size]" value="_SIZE_" />
				</td>
				<td id="wall_buttons__ID_">
					<a href="#" class="remove_wall_button" name="_STEP_[_FIELDNAME_][_ID_][delete]" id="_STEP_[_FIELDNAME_][_ID_][delete]">
						<img width="50" border="0" height="30" name="Image221" alt="Clear" src="images/clear_b.jpg">
					</a>
					<a href="#" class="show_dialog_openings_to_wall_button" number="_ID_" >
						Openings
					</a>
					<div id="opening_dialog[_ID_]" class="openings_table field_text " style="display:none;">
						<div class="openings_container" class="scrollable">
							<a role="button" class="openings_dialog_close ui-corner-all" href="#">
								<span class="ui-icon ui-icon-closethick">close</span>
							</a>
							<div style="height:150px; overflow-y: auto;">
								<table id="add_openings_target[_ID_]" class="">
									<thead>
										<tr>
											<th>#</th>
											<th>Width (mm)</th>
											<th>Height (mm)</th>
											<th>Total Area (m2)</th>
											<th></th>
										</tr>
									</thead>
									<tbody class="openings"></tbody>
									<tfoot>
										<tr>
											<th colspan="3">Total area (m2)</th>
											<th>
												<input class="total_opening_area" size="7" type="text" name="step2[total_opening_area][_ID_]" id="step2[total_opening_area][_ID_]" value="" />
											</th>
											<th></th>
										</tr>
									</tfoot>
								</table>
							</div>
							<div style="position: absolute; bottom: 5px;">
								<h3>Add opening</h3>
								<div class="form-group col-area">
									<label class="input-label" for="add_opening[_ID_][width]">Width (mm)</label>
									<input class="opening_width" name="add_opening[_ID_][width]" id="add_opening[_ID_][width]" size="10" />
								</div>
								<div class="form-group col-area">
									<label class="input-label" for="add_opening[_ID_][height]">Height (mm)</label>
									<input class="opening_height" name="add_opening[_ID_][height]" id="add_opening[_ID_][height]" size="10" />
								</div>
								<div class="form-group col-area">
									<label class="input-label" for="add_opening[_ID_][size]">or Size (m2)</label>
									<input class="opening_size" name="add_opening[_ID_][size]" id="add_opening[_ID_][size]" size="10" />
								</div>
								<a href="#" class="add_opening_button" number="_ID_">
									Add Opening
								</a>
							</div>
						</div>
					</div>
				</td>
			</tr>	
		</tbody>
	</table>
	<table id="template_addopening">
		<tbody>
			<tr class="opening_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][_ID2_][width]">_LABEL_</label>
				</td>
				<td>
					<input number="_ID_" number2="_ID2_" class="opening_width" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][_ID2_][width]" id="_STEP_[_FIELDNAME_][_ID_][_ID2_][width]" value="_WIDTH_"/>
				</td>
				<td>
					<input number="_ID_" number2="_ID2_" class="opening_height" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][_ID2_][height]" id="_STEP_[_FIELDNAME_][_ID_][_ID2_][height]" value="_HEIGHT_" />
				</td>
				<td>
					<input number="_ID_" number2="_ID2_" class="opening_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][_ID2_][size]" id="_STEP_[_FIELDNAME_][_ID_][_ID2_][size]" value="_SIZE_" />
				</td>
				<td>
					<a href="#" class="remove_opening_button"  number="_ID_" name="_STEP_[_FIELDNAME_][_ID_][_ID2_][delete]" id="_STEP_[_FIELDNAME_][_ID_][_ID2_]delete]">
						<img width="50" border="0" height="30" name="Image221" alt="Clear" src="images/clear_b.jpg">
					</a>
				</td>
			</tr>	
		</tbody>
	</table>
	<table id="template_addgable">
		<tbody>
			<tr class="gable_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][width]">_LABEL_</label>
				</td>
				<td>
					<input number="_ID_" class="gable_base" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][base]" id="_STEP_[_FIELDNAME_][_ID_][base]" value="_BASE_"/>
				</td>
				<td>
					<input class="gable_height" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][height]" id="_STEP_[_FIELDNAME_][_ID_][height]" value="_HEIGHT_" />
				</td>
				<td>
					<input class="gable_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][size]" id="_STEP_[_FIELDNAME_][_ID_][size]" value="_SIZE_" />
				</td>
				<td>
					<a href="#" class="remove_gable_button" name="_STEP_[_FIELDNAME_][_ID_][delete]" id="_STEP_[_FIELDNAME_][_ID_][delete]">
						<img width="50" border="0" height="30" name="Image221" alt="Clear" src="images/clear_b.jpg">
					</a>
				</td>
			</tr>	
		</tbody>
	</table>
	<div id="template_step3_button">
		<a href="#" class="go_to_estimation">
			<img width="195" border="0" height="22" name="Go to Estimation Page" alt="Go to Estimation Page" src="templates/images/goto_estimation_but.jpg">
		</a>
	</div>
</div>

<div style="width: auto; height: 500px; min-height: 150px; display: none" id="term_popup" class="ui-dialog-content ui-widget-content">
	<a role="button" class="ui-dialog-titlebar-close ui-corner-all" href="#">
		<span class="ui-icon ui-icon-closethick">close</span>
	</a>

	<div style="top:0px; left:0px;position:absolute;margin:30px;font-size: 12px;	line-height: 18px;	font-weight: normal;">
	<span class="Field_text">
		<table width="250" border="0" id="table1">
			<tbody><tr>
				<td style="font-size: 10pt; line-height: 100%"><strong>Important Note:</strong><br>I understand that the quantities estimated by this calculator are to be used as a guide only, do not include all building components
		 eg Flashings, additional corrosion requirements and will be checked by a qualified person.<br>
				</td>
			</tr>
			</tbody>
		</table>
	</span>		
		
	<input type="button" id="yes_arg" value="Yes">
	<input type="button" id="no_arg"value="No"> 
	</div>
</div>