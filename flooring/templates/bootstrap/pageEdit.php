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
