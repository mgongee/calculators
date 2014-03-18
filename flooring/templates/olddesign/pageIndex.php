<div>
	<img width="1000" border="0" alt="" src="templates/olddesign/images/floor_strip.jpg">
</div>
<div id="middle-wrapper-div">
	<div id="Step1main" style="position: absolute; left: 53px; top: 278px">
		<table width="1000" cellspacing="0" cellpadding="0" border="0">
		<tbody>
			<tr>
				<td valign="top" align="left" height="240">
					<img id="bg_img" src="images/Step1_bg_floor.jpg" width="1000" alt="" border="0" />
				</td>
			</tr>
		</tbody>
		</table>
	</div>
	<div id="Step1_prod_text" >
		<span class="Product_headingsSML">Hardieflex Senepa</span><br><span class="accelerate_body">A smooth fascia board which comes in a variety of widths and lengths.</span><br><br><table class="Field_text" height="123" border="0" cellpadding="0" cellspacing="0" width="190">
		<tbody><tr>
		  <td class="Field_text" height="12" width="26"></td>
		  <td class="Field_text" width="89">Dimension </td>
		</tr>
		 <tr>  <td colspan="2" class="accelerate_body" height="2"><img src="../images/Green_line.jpg" alt="line" height="2" width="193"></td>    </tr>
			<tr>
		  <td class="Field_text2" height="11">9mm</td>
		  <td class="Field_text2" height="11">10in x 8ft</td>
		</tr>
		<tr>      <td colspan="2" class="accelerate_body" height="2"><img src="../images/Green_line.jpg" alt="line" height="2" width="193"></td>    </tr>
		<tr>
		  <td class="Field_text2" height="11">12mm</td>
		  <td class="Field_text2" height="11">10in x 8ft</td>
		</tr>
		<tr>
		  <td colspan="2" class="Field_text2" height="2"><img src="../images/Green_line.jpg" alt="line" height="2" width="193"></td>
		</tr>
		<tr>
		  <td class="Field_text2" height="11">12mm</td>
		  <td class="Field_text2" height="11">12in x 8ft</td>
		</tr>
		<tr>
		  <td colspan="2" class="Field_text2" height="2"><img src="../images/Green_line.jpg" alt="greenline" height="2" width="193"></td>
		</tr>
		<tr>
		  <td class="Field_text2" height="11">12mm</td>
		  <td class="Field_text2" height="11">12in x 12ft</td>
		</tr>
		<tr>
		  <td colspan="2" class="Field_text2" height="2"><img src="../images/Green_line.jpg" alt="line" height="2" width="193"></td>
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
					echo ("<option value=\"$projectId\">$projectName</option>");
				}
				?>
			</select>
		</div>

		<form id="calcForm" method="post" action="index.php">
			<input type="hidden" name="manager_name" value="Joan Rowling">
			<input type="hidden" name="project_type" id="project_type" value="flooring" />
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
	in order to be correctly processed by "calculate_area_size" and "update_area_dimensions" functions,fields
		"add_area[...]"
	and 
		"_STEP_[_FIELDNAME_][_ID_][...]"
	
	must match the following rules:

	1) to have IDs that end with [length], [width], or [size]
	2) to have classes "area_width" or "area_length" or "area_size"

-->
<div id="templates" style="display:none">
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
		<div class="col50 scrolling">
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
						<th></th>
						<th>
							<input class="total_area_size" size="7" type="text" name="step2[total_area_size]" id="step2[total_area_size]" value="" />
						</th>
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
						<img width="35" border="0" height="20" name="Image221" alt="Clear" src="images/clear_b.jpg">
					</a>
				</td>
			</tr>	
		</tbody>
	</table>
	<div id="template_step3_button">
		<a href="#" class="go_to_estimation">
			<img width="195" border="0" height="22" name="Go to Estimation Page" alt="Go to Estimation Page" src="templates/olddesign/images/goto_estimation_but.jpg">
		</a>
	</div>
</div>