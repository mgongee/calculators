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
					</map> 
				</td>
			</tr>
		</tbody>
		</table>
	</div>
	<div id="step1_banner" class="scrolling">
		<div id="step1_banner_target"></div>
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
			<input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
			<input type="hidden" name="project_type" id="project_type" value="flooring" />
			<input type="hidden" name="action" id="action" value="estimate">

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
	in order to be correctly processed by "calculate_area_size" and "update_area_dimensions" functions,fields
		"add_area[...]"
	and 
		"_STEP_[_FIELDNAME_][_ID_][...]"
	
	must match the following rules:

	1) to have IDs that end with [length], [width], or [size]
	2) to have classes "area_width" or "area_length" or "area_size"

-->
<div id="templates" style="display:none">
	<div id="template_step1">
		<div style="position:absolute;  width:300px; left:0px; top:70px;" class="form-group">
			<label class="input-label" for="step1[project_name]">Project name</label><br>
			<input type="text" name="step1[project_name]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default" id="step1[project_name]" size="50" value="">
		</div>
		<div style="position:absolute;  width:300px; left:0px; top:120px;" class="form-group">
			<label class="input-label" for="step1[product]">Select the product required</label><br>
			<select id="step1[product]" name="step1[product]" class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default valid">
				<option value="hardieflex_flooring_16mm">HardieFlex Flooring 16 mm</option>
			</select>
		</div>
		<div style="position: absolute; width: 120px; left: 250px; top: 170px; display: block;" class="form-group">
			<label class="input-label" for="step1[waste]">Waste %</label><br>
			<input type="text" name="step1[waste]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default" id="step1[waste]" size="8" value="5">
		</div>
		<div style="position: absolute; width: 180px; left: 0px; top: 170px; display: block;" class="form-group">
			<label class="input-label" for="step1[type_of_frame]">Type of frame</label><br>
			<select id="step1[type_of_frame]" name="step1[type_of_frame]" class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default valid">
			<option value="steel_1.2_to_1.6mm_bmt">Steel 1.2 to 1.6 mm BMT</option>
			</select>
		</div>
		<div class="form-group" style="position: absolute; width: 120px; left: 250px; top: 120px; display: block;">
			<label class="input-label" for="step1[floor_joist_space]">Floor Joist space</label><br>
			<select id="step1[floor_joist_space]" name="step1[floor_joist_space]" class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default"><option value="300mm">300 mm</option>
			</select>
		</div>
		<div style="width: 300px; left: 0px; display: block; position: absolute; top: 220px;" class="form-group">
			<label class="input-label" for="step1[sheet_size]">Sheet size</label><br>
			<select id="step1[sheet_size]" name="step1[sheet_size]" class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default">
				<option value="16mm_x_600mm_x_2400mm">16mm x 600mm x 2400mm</option>
				<option value="16mm_x_1200mm_x_2400mm">16mmx 1200mm x 2400mm</option>
			</select>
		</div>
	</div>
	<div id="template_step2">
		<div class="col50 add_area_form">
			<h3>Add areas</h3>
			<div class="form-group col-area">
				<label class="input-label" for="add_area[width]">Width (mm)</label>
				<input class="area_width" name="add_area[width]" id="add_area[width]" size="7" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_area[length]">Length (mm)</label>
				<input class="area_length" name="add_area[length]" id="add_area[length]" size="7" />
			</div>
			<div class="form-group col-area">
				<label class="input-label" for="add_area[size]">or Size (m2)</label>
				<input class="area_size" name="add_area[size]" id="add_area[size]" size="7" />
			</div>
			<div class="col-area centered">
				<a id="add_area_button" onmouseover="MM_swapImage('add_area_img','','images/ADDAREAlrgb.jpg',1)" onmouseout="MM_swapImgRestore()" href="#"><img width="110" border="0" height="21" name="add_area_img" alt="Add area" src="images/ADDAREAlrga.jpg"></a>
			</div>		
		</div>
		<div class="col50 scrolling" style="height:200px">
			<table id="add_areas_target" class="areas_table field_text">
				<thead>
					<tr>
						<th>#</th>
						<th>Width (mm)</th>
						<th>Length (mm)</th>
						<th>Total Area (m2)</th>
						<th></th>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot>
					<tr>
						<th colspan="3">Total building floor area (m2)</th>
						<th>
							<input class="total_area_size" size="7" type="text" name="step2[total_area_size]" id="step2[total_area_size]" value="" />
						</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<table id="template_addarea">
		<tbody>
			<tr class="area_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][width]">_LABEL_</label>
				</td>
				<td>
					<input number="_ID_" class="area_width" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][width]" id="_STEP_[_FIELDNAME_][_ID_][width]" value="_WIDTH_"/>
				</td>
				<td>
					<input class="area_length" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][length]" id="_STEP_[_FIELDNAME_][_ID_][length]" value="_LENGTH_" />
				</td>
				<td>
					<input class="area_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][size]" id="_STEP_[_FIELDNAME_][_ID_][size]" value="_SIZE_" />
				</td>
				<td>
					<a href="#" class="remove_area_button" name="_STEP_[_FIELDNAME_][_ID_][delete]" id="_STEP_[_FIELDNAME_][_ID_][delete]">
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
	<div id="template_step1_banner_choose">
		<p align="center"> <img width="313" border="0" height="99" alt="" src="images/Step1_icon.jpg"></p>
	</div>
	<div id="template_step1_banner_flooring">
		<img src="images/Flex-Senepa.jpg" width="402" height="160" />
		<div id="Step1_Hardieflex_Senepa_Text" class="Step1_prod_text"  ><span class="Product_headingsSML">Hardieflex Senepa</span><br>
			<span class="accelerate_body">A smooth fascia board which comes in a variety of widths and lengths.</span><br>
			<br>
			<table width="190" height="123" border="0" cellpadding="0" cellspacing="0" class="Field_text">
			  <tr>
				<td width="26" height="12" class="Field_text"></td>
				<td width="89" class="Field_text">Dimension </td>
			  </tr>
			   <tr>  <td height="2" colspan="2" class="accelerate_body"><img src="images/green_line.png" alt="line" width="193" height="2"></td>    </tr>
				  <tr>
				<td height="11" class="Field_text2">9mm</td>
				<td height="11" class="Field_text2">10in x 8ft</td>
			  </tr>
			  <tr>      <td height="2" colspan="2" class="accelerate_body"><img src="images/green_line.png" alt="line" width="193" height="2"></td>    </tr>
			  <tr>
				<td height="11" class="Field_text2">12mm</td>
				<td height="11" class="Field_text2">10in x 8ft</td>
			  </tr>
			  <tr>
				<td height="2" colspan="2" class="Field_text2"><img src="images/green_line.png" alt="line" width="193" height="2"></td>
			  </tr>
			  <tr>
				<td height="11" class="Field_text2">12mm</td>
				<td height="11" class="Field_text2">12in x 8ft</td>
			  </tr>
			  <tr>
				<td height="2" colspan="2" class="Field_text2"><img src="images/green_line.png" alt="greenline" width="193" height="2"></td>
			  </tr>
			  <tr>
				<td height="11" class="Field_text2">12mm</td>
				<td height="11" class="Field_text2">12in x 12ft</td>
			  </tr>
			  <tr>
				<td height="2" colspan="2" class="Field_text2"><img src="images/green_line.png" alt="line" width="193" height="2"></td>
			  </tr>
			</table>
		</div>
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