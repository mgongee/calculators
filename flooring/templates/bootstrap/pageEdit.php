<?php if ($success): ?>

<div id="projectData" style="display:none"><?php echo($project['project_data']); ?></div>
<form id="calcForm" method="post" action="index.php?route=edit">
	<input type="hidden" name="project_id" value="<?php echo $project['project_id']; ?>">
	<input type="hidden" name="manager_name" value="<?php echo $project['manager_name']; ?>">
	<input type="hidden" name="project_type" id="project_type" value="flooring" />

	<div id="fieldWrapper">
	</div>
	<div id="navigation"> 							
		<div class="col-lg-4">
			<input class="navigation_button btn btn-lg btn-success" id="back" value="Back" type="reset" />
		</div>
		<div class="col-lg-4">
			<input class="navigation_button btn btn-lg btn-success" id="next" value="Next" type="submit" />
		</div>
	</div>
	<p id="data"></p>
</form>
<?php else: ?>
	Failed to load project.
<?php endif; ?>

	
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
		<div class="col-lg-6 add_area_form">
			<h3>Add areas</h3>
			<div class="form-group col-lg-3">
				<label for="add_area[width]">Width (mm)</label>
				<input class="area_width" name="add_area[width]" id="add_area[width]" size="7" />
			</div>
			<div class="form-group col-lg-3">
				<label for="add_area[length]">Length (mm)</label>
				<input class="area_length" name="add_area[length]" id="add_area[length]" size="7" />
			</div>
			<div class="form-group col-lg-3">
				<label for="add_area[size]">or Size (m2)</label>
				<input class="area_size" name="add_area[size]" id="add_area[size]" size="7" />
			</div>
			<div class="col-lg-3">
				<input class="btn btn-lg btn-success" id="add_area_button" value="Add Area" type="button" />
			</div>		
		</div>
		<div class="col-lg-6">
			<table id="add_areas_target" class="areas_table">
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
					<input class="remove_area_button" type="button" name="_STEP_[_FIELDNAME_][_ID_][delete]" id="_STEP_[_FIELDNAME_][_ID_][delete]" value="Clear" />
				</td>
			</tr>	
		</tbody>
	</table>
</div>