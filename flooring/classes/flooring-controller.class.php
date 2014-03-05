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
		
		$action = "error";
		
		if (isset($_POST['project_id'])) {
			$action = 'save';
			$projectId = $_POST['project_id'];
		}
		else if(isset($_GET['id'])) {
			$action = 'edit';
			$projectId = $_GET['id'];
		}
			//echo("<pre>" . print_r($_POST, 1) . "</pre>");die();

		$project = ProjectManager::getById($projectId);
		
		if ($project) {
			$T['project'] = $project;
			
			switch ($action) :
				case "edit":
					$T['success'] = true;
					break;
					
				case "save":
					$result = ProjectManager::updateFromForm($projectId,$_POST);

					if ($result) {
						$project = ProjectManager::getById($projectId); //reload the project as it has beed updated
						$T['project'] = $project;
						$T['success'] = true;
						$this->addSuccessMessage('Project successfully saved');

					}
					else {
						$T['success'] = false;
						$this->addErrorMessage('Failed to save project');	
					}
					break;
				default:
						$T['success'] = false;
						$this->addErrorMessage('Some error occured');	
			endswitch;
		
		}
		else {
			$T['success'] = false;
			$this->addErrorMessage('Failed to load project with specified id = ' . $projectId);	
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
