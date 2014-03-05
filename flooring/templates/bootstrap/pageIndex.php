<div class="row">
	<div class="col-lg-12">
		<h1 class="page-header">
			<small>Welcome,</small>
			<?php echo $manager_name ?>
		</h1>
	</div>
</div>
<form id="chooseForm" method="get" action="index.php">
	<input type="hidden" name="route" value="edit">
	<div class="row" style="margin-bottom: 20px">
		<div class="col-lg-12">
			<h2><label class="control-label" for="state">Choose your project:</label></h2>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-4">
			<select id="project_id" name="project_id" class="form-control">
				<option value="">...</option>");
				<?php
				foreach ($projectList as $projectId => $projectName) {
					echo ("<option value=\"$projectId\">$projectName</option>");
				}
				?>
			</select>
		</div>
	</div>
</form>
	<div class="row">
		<div class="col-lg-12">
			<h2><label class="control-label" for="state">Or</label></h2>
		</div>
	</div>
<form id="chooseForm" method="get" action="index.php">	
	<input type="hidden" name="route" value="add">
	<div class="row">
		<div class="col-lg-12">
			<button id="submit" name="submit" class="btn btn-lg btn-success" type="submit">Create new</button>
		</div>
	</div>
</form>
