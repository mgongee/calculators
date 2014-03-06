<form id="calcForm" method="post" action="index.php?route=index">
	<input type="hidden" name="manager_name" value="Joan Rowling">
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

<p id="sr"></p>
<div id="templates" style="display:none">
	<div id="template_step2">
		<div class="col-lg-6 add_area_form">
			<h3>Add areas</h3>
			<div class="form-group col-lg-3">
				<label for="add_area[width]">Width</label>
				<input class="area_width" name="add_area[width]" id="add_area[width]" size="7" />
			</div>
			<div class="form-group col-lg-3">
				<label for="add_area[length]">Length</label>
				<input class="area_length" name="add_area[length]" id="add_area[length]" size="7" />
			</div>
			<div class="form-group col-lg-3">
				<label for="add_area[size]">or Size</label>
				<input class="area_size" name="add_area[size]" id="add_area[size]" size="7" />
			</div>
			<div class="col-lg-3">
				<input class="btn btn-lg btn-success" id="add_area_button" value="Add Area" type="button" />
			</div>		
		</div>
		<div class="col-lg-6">
			<table id="add_areas_target" class="areas_table">
				<thead>
					<th>#</th>
					<th>Width (mm)</th>
					<th>Length (mm)</th>
					<th>Total Area (m2)</th>
					<th></th>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
	<table id="template_addarea">
		<tbody>
			<tr class="area_entry">
				<td>
					<label for="_STEP_[_FIELDNAME_][_ID_][width][width]">_LABEL_</label>
				</td>
				<td>
					<input class="area_width" size="7" type="text" name="_STEP_[_FIELDNAME_][_ID_][width][width]" id="_STEP_[_FIELDNAME_][_ID_][width]" value="_WIDTH_"/>
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