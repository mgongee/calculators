<?php

/**
 * This is the main routing &cintroller class of the Flooring calculator
 */
class FlooringController extends CalculatorController{
	
	
	protected function pageIndex() {
		global $T;
		
		if (isset($_POST['manager_name'])) {
			//echo("<pre>" . print_r($_POST, 1) . "</pre>");die();
			if (ProjectManager::addFromForm($_POST)) {
				$this->addSuccessMessage('Project successfully saved');
			}
			else {
				$this->addErrorMessage('Failed to save project');	
			}
		}
		
		$projects = ProjectManager::getAll();
		$projectList = array();
		
		foreach ($projects as $project) {
			$projectList[$project['project_id']] = $project['project_name'];
		}
		
		$T['projectList'] = $projectList;
		
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}
	
	protected function pageAdd() {
		global $T;
		
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}
	
	protected function pageEdit() {
		global $T;
		
		if (isset($_POST['project_id'])) {
			//echo("<pre>" . print_r($_POST, 1) . "</pre>");die();
			$projectId = $_POST['project_id'];
			$result = ProjectManager::updateFromForm($projectId,$_POST);
			
			if ($result) {
				$T['success'] = true;
				$this->addSuccessMessage('Project successfully saved');
				
			}
			else {
				$T['success'] = false;
				$this->addErrorMessage('Failed to save project');	
			}
		}
		else if(isset($_GET['id'])) {
			$projectId = $_GET['id'];
			$project = ProjectManager::getById($projectId);
			
			if ($project) {
				$T['success'] = true;
				$T['project'] = $project;
			}
			else {
				$T['success'] = false;
				$this->addErrorMessage('Failed to load project with specified id = ' . $projectId);	
			}	
		}

		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}

	public function headers($headers,$content) {
		global $T;
		extract($T);
		
		foreach ($headers as $header) {
			header($header);
		}
		echo $content;
		
		die();
	}


}
