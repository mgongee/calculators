<div id="middle-wrapper-div">
	<div id="Default"> 
		<img src="templates/olddesign/images/Step1_icon.jpg" alt="click left" width="313" height="99" border="0">
	</div>
	<div id="Step1main" style="position: absolute; left: 53px; top: 278px">
		<table width="1000" cellspacing="0" cellpadding="0" border="0">
		<tbody>
			<tr>
				<td valign="top" align="left" height="240">
					<img width="1000" border="0" height="240" usemap="#Map2" src="templates/olddesign/images/Step1_bg_floor.jpg">
				</td>
			</tr>
		</tbody>
		</table>
	</div>
	<div id="Step1layer1" style="visibility: visible;">
		<div style="valign:center; width:390px; height:150px; background-color:#647684;" id="load_projects">
			<div style="position:absolute;  width:300px; left:10px; top:10px;">
				<span style="color:#ffffff;" class="Product_headings">Load Existing Project</span><br>	
				<select style="width:370px; font-size:12px;" tabindex="1" id="project_id" name="project_id">
					<option value="">Please select previously saved files</option>");
					<?php
					foreach ($projectList as $projectId => $projectName) {
						echo ("<option value=\"$projectId\">$projectName</option>");
					}
					?>
				</select>
				<br>
				<span style="color:#ffffff;" class="Product_headings">Or</span>
				<form id="chooseForm" method="get" action="index.php">	
					<input type="hidden" name="route" value="add">
					<button id="submit" name="submit" type="submit">Create new project</button>
				</form>
			</div>
		</div>
	</div>
</div><!-- /#middle-wrapper-div -->