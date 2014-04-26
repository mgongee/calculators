<div>
	<img width="1000" border="0" alt="" src="templates/images/floor_strip.jpg">
</div>
<div id="projectData" style="display:none"><?php echo($project['project_data']); ?></div>
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
					if ($projectId == $project['project_id']) {
						echo ("<option selected=\"selected\" value=\"$projectId\">$projectName</option>");
					}
					else {
						echo ("<option value=\"$projectId\">$projectName</option>");
					}
				}
				?>
			</select>
		</div>

		<form id="calcForm" method="post" action="index.php?route=edit">
			<input type="hidden" name="project_id" id="project_id" value="<?php echo $project['project_id']; ?>">
			<input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
			<input type="hidden" name="project_type" id="project_type" value="matrix" />
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
	<div id="template_step1">
		<div style="position:absolute;  width:300px; left:0px; top:70px;" class="form-group">
			<label for="step1[project_name]" class="input-label">Project name</label>
			<input type="text" value="" size=50" id="step1[project_name]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default valid" name="step1[project_name]">
		</div>
		<div style="position:absolute;  width:300px; left:0px; top:120px;" class="form-group">
			<label for="step1[product]" class="input-label">Select the product required</label>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[product]" id="step1[product]">
				<option value="hardieflex_sheet">HardiePlank Sheets</option>
				<option value="hardieflex_pro">HardiePlank Pro</option>
			</select>
		</div>
		<div style="width: 300px; left: 0px; display: block; position: absolute; top: 220px;" class="form-group">
			<label for="step1[application]" class="input-label">Application</label><br/>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[application]" id="step1[application]">
				<option value="ceiling_uninsulated">Ceiling uninsulated&lt;600</option>
				<option value="dry_wall">Dry wall fastener only</option>
				<option value="wet_area_wall">Wet Area Wall (same as untiled)</option>
			</select>
		</div>
		<div style="position: absolute; width: 180px; left: 0px; top: 170px; display: block;" class="form-group">
			<label for="step1[type_of_frame]" class="input-label">Type of frame</label>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[type_of_frame]" id="step1[type_of_frame]">
				<option value="steel">Steel 0.55 to 1.66 mm BMT</option>
				<option value="timber">Timber</option>
			</select>
		</div>
		<div class="form-group" style="position: absolute; width: 120px; left: 250px; top: 120px; display: block;">
			<label for="step1[allowance]" class="input-label">Allowance %</label>
			<input type="text" value="5" size="7" id="step1[allowance]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[allowance]">
		</div>
	</div>
	<div id="template_step2">
		<table id="add_walls_target" class="walls_table field_text">
			<thead>
				<tr>
					<th>Sheet size</th>
					<th>Orientation</th>
					<th>Frame Spacing (mm)</th>
					<th>Height/Width (mm)</th>
					<th>Length (mm)</th>
					<th>Area (m2)</th>
					<th></th>
				</tr>
			</thead>
			<tbody class="walls"></tbody>
		</table>
		<br/>
		<a id="add_wall_button" href="#"><img width="110" border="0" height="21" name="add_wall_img" alt="Add wall" src="images/ADDAREAlrga.jpg"></a>	
	</div>
	<table id="template_addwall">
		<tbody>
			<tr class="wall_entry">
				<td>
					<select num="_ID_" class="wall_sheet_size" name="_STEP_[_FIELDNAME_][_ID_][sheet_size]" id="_STEP_[_FIELDNAME_][_ID_][sheet_size]" </select>
				</td>
				<td>
					<select num="_ID_" class="wall_orientation" name="_STEP_[_FIELDNAME_][_ID_][orientation]" id="_STEP_[_FIELDNAME_][_ID_][orientation]"></select>
				</td>
				<td>
					<input num="_ID_" readonly="readonly" class="wall_frame_spacing" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][frame_spacing]" id="_STEP_[_FIELDNAME_][_ID_][frame_spacing]" value="_FRAME_SPACING_"/>
				</td>
				<td>
					<input num="_ID_" class="wall_height" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][height]" id="_STEP_[_FIELDNAME_][_ID_][height]" value="_HEIGHT_"/>
				</td>
				<td>
					<input num="_ID_" class="wall_length" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][length]" id="_STEP_[_FIELDNAME_][_ID_][length]" value="_LENGTH_"/>
				</td>
				<td>
					<input class="wall_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][size]" id="_STEP_[_FIELDNAME_][_ID_][size]" value="_SIZE_" />

					<!-- hidden inputs -->
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][fastener_type]" id="_STEP_[_FIELDNAME_][_ID_][fastener_type]" value="_FASTENER_TYPE_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][no_of_fasteners_per_sheet]" id="_STEP_[_FIELDNAME_][_ID_][no_of_fasteners_per_sheet]" value="_FASTENERS_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][amount_of_putty]" id="_STEP_[_FIELDNAME_][_ID_][amount_of_putty]" value="_PUTTY_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][amount_of_sealant]" id="_STEP_[_FIELDNAME_][_ID_][amount_of_sealant]" value="_SEALANT_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][control_joints]" id="_STEP_[_FIELDNAME_][_ID_][control_joints]" value="_CONTROL_JOINTS_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][perforated_paper_tape]" id="_STEP_[_FIELDNAME_][_ID_][perforated_paper_tape]" value="_PAPER_TYPE_"/>
					<input num="_ID_" type="hidden" name="_STEP_[_FIELDNAME_][_ID_][amount_of_tape]" id="_STEP_[_FIELDNAME_][_ID_][amount_of_tape]" value="_PAPER_"/>
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