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
					<img id="bg_img" src="images/Step1_bg_floor.jpg" width="1000" alt="" border="0" />
					<map name="step_map">
						<area shape="rect" coords="69,44,122,60" href="step1" alt="Step 1">
						<area shape="rect" coords="123,44,179,60" href="step2" alt="Step 2">
					</map> 
				</td>
			</tr>
		</tbody>
		</table>
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
			<input type="hidden" name="project_type" id="project_type" value="flooring" />
			<input type="hidden" name="action" id="action" value="save">

			<div id="fieldWrapper">
			</div>
			<div id="navigation" style="padding-top:40px;clear:both"> 							
				<div class="col-lg-4">
					<input class="navigation_button button_back" id="back" value="" type="reset" />
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
			<label for="step1[project_name]" class="input-label">Project name</label><br>
			<input type="text" value="" size="50" id="step1[project_name]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[project_name]">
		</div>
		<div style="position:absolute;  width:300px; left:0px; top:120px;" class="form-group">
			<label for="step1[product]" class="input-label">Select the product required</label><br>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[product]" id="step1[product]">
				<option value="hardieflex_senepa">Hardieflex Senepa</option>
			</select>
		</div>
		<div style="position: absolute; width: 180px; left: 0px; top: 170px; display: block;" class="form-group">
			<label for="step1[type_of_frame]" class="input-label">Type of frame</label><br>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[type_of_frame]" id="step1[type_of_frame]">
				<option value="steel_0.55_to_1.66mm_bmt">Steel 0.55 to 1.66 mm BMT</option>
				<option value="timber">Timber</option>
			</select>
		</div>
		<div  style="position: absolute; width: 120px; left: 250px; top: 120px; display: block;" class="form-group">
			<label for="step1[allowance]" class="input-label">Allowance %</label><br>
			<input type="text" value="5" size="7" id="step1[allowance]" class="input-field field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[allowance]">
		</div>
		<div style="width: 300px; left: 0px; display: block; position: absolute; top: 220px;" class="form-group">
			<label for="step1[product_size]" class="input-label">Product size</label><br>
			<select class="form-control field_text ui-wizard-content ui-helper-reset ui-state-default" name="step1[product_size]" id="step1[product_size]">
				<option value="9mm_x_254mm_x_2438mm">9mm x 254mm x 2438mm</option>
				<option value="12mm_x_254mm_x_2438mm">12mm x 254mm x 2438mm</option>
				<option value="12mm_x_305mm_x_2438mm">12mm x 305mm x 2438mm</option>
				<option value="12mm_x_305mm_x_3360mm">12mm x 305mm x 3360mm</option>
			</select>
		</div>
	</div>
	<div id="template_step2">
		<div class="col50 add_length_form">
			<h3>Add lengths</h3>
			<div class="form-group col-area">
				<label class="input-label" for="add_length[length]">Length (mm)</label>
				<input class="add_length" name="add_length[length]" id="add_length[length]" size="7" />
			</div>
			<div class="col-area centered">
				<a id="add_length_button" href="#"><img width="110" border="0" height="21" name="add_area_img" alt="Add area" src="images/ADDAREAlrga.jpg"></a>
			</div>		
		</div>
		<div class="col50 scrolling" style="height:200px">
			<table id="add_lengths_target" class="lengths_table field_text">
				<thead>
					<tr>
						<th>#</th>
						<th>Length (mm)</th>
						<th></th>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot>
					<tr>
						<th colspan="3">Total length (mm)</th>
						<th>
							<input class="total_length_size" size="7" type="text" name="step2[total_length_size]" id="step2[total_length_size]" value="" />
						</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<table id="template_addlength">
		<tbody>
			<tr class="length_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][length]">_LABEL_</label>
				</td>
				<td>
					<input number="_ID_" class="length_size" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][length]" id="_STEP_[_FIELDNAME_][_ID_][length]" value="_LENGTH_"/>
				</td>
				<td>
					<a href="#" class="remove_length_button" name="_STEP_[_FIELDNAME_][_ID_][delete]" id="_STEP_[_FIELDNAME_][_ID_][delete]">
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