<?php

/**
 * This is the main routing &cintroller class of the Flooring calculator
 */
class FlooringController extends CalculatorController{
	
	
	protected function pageIndex() {
		global $T;
		
		$projects = ProjectManager::getAll('flooring');
		$projectList = array();

		foreach ($projects as $project) {
			$projectList[$project['project_id']] = $project['project_name'];
		}

		$T['projectList'] = $projectList;
		$T['success'] = true;
		
		if (isset($_POST['action'])) { // user clicked the button on the 'add project' form
			$projectId = ProjectManager::addFromForm($_POST); // so we must save this project
			if ($projectId) {
				$this->addSuccessMessage('Project successfully saved');
				$_GET["id"] = $projectId;
				
				switch($_POST["action"]) : 
				case "save": // if the clicked button was the "save"
					header("Location: index.php?route=edit&id=".$projectId);
					die();
					break;
				case "estimate": // if the clicked button was the "estimate"
					header("Location: index.php?route=estimate&id=".$projectId);
					die();
					break;
				endswitch;
			}
			else {
				$T['success'] = false;
				$this->addErrorMessage('Failed to save project');	
			}
		}

		if ($T['success'] === false) {
			throw new Exception("Some error occured");
		}
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}

	protected function pageEstimate() {
		global $T;
		
		if (isset($_POST['project_id'])) {
			$projectId = $_POST['project_id'];
		}
		else if(isset($_GET['id'])) {
			$projectId = $_GET['id'];
		}		
		

		$libraries = ProjectManager::getCostLibraries();
		$costLibraries = array();

		foreach ($libraries as $library) {
			$costLibraries[$library['list_name']] = $library['list_name'];
		}
		$project = ProjectManager::getById($projectId);

		if ($project) {
			$T['project'] = $project;
			$T['costLibraries'] = $costLibraries;
			$T['success'] = true;
		}
		else {
			$T['success'] = false;
			$this->addErrorMessage('Failed to load project with specified id = ' . $projectId);	
		}
		
		if ($T['success'] === false) {
			throw new Exception("Some error occured");
		}
		
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}
	
	protected function pageEdit() {
		global $T;
		
		$action = "error";
		$projects = ProjectManager::getAll('flooring');
		$projectList = array();

		foreach ($projects as $p) {
			$projectList[$p['project_id']] = $p['project_name'];
		}
		$T['projectList'] = $projectList;

		if (isset($_POST['action'])) {
			
			if (isset($_POST['project_id'])) {
				$projectId = $_POST['project_id'];

				$result = ProjectManager::updateFromForm($projectId,$_POST);

				if ($result) {
					
					if ($_POST["action"] == "estimate") {
						header("Location: index.php?route=estimate&id=".$projectId);
						//return $this->pageEstimate();
					}
					else {
						$project = ProjectManager::getById($projectId); //reload the project as it has beed updated
						$T['project'] = $project;
						$T['success'] = true;
						$this->addSuccessMessage('Project successfully saved');						
					}
				}
				else {
					$T['success'] = false;
					$this->addErrorMessage('Failed to save project');	
				}
			}
			
		}
		else if(isset($_GET['id'])) {
			$projectId = $_GET['id'];
		
			$project = ProjectManager::getById($projectId);
		
			if ($project) {
				$T['project'] = $project;
				$T['success'] = true;
			}
			else {
				$T['success'] = false;
				$this->addErrorMessage('Failed to load project with specified id = ' . $projectId);	
			}
		}
		else {
			$T['success'] = false;	
		}
		
		if ($T['success'] === false) {
			throw new Exception("Some error occured");
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

		
	protected function pageReport() {
		global $T;
		
		if (isset($_POST['project_id'])) {
			$projectId = $_POST['project_id'];
			$reportType = $_POST['report_type'];
			if ($reportType == "excel") {
				$xlsReport = new ReportMakerXls($_POST);
				
				$filename = time() . '_' . $projectId . '.xls';
			/** For Excel 2007	
				header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, charset=utf-8; encoding=UTF-8');
				header('Content-Disposition: attachment;filename=' . $filename);
				header('Cache-Control: max-age=0');
			*/
				
			/** For Excel 97 */
				header('Content-Type: application/vnd.ms-excel, charset=utf-8; encoding=UTF-8');
				header('Content-Disposition: attachment;filename=' . $filename);
				header('Cache-Control: max-age=0');
				
				
				$xlsReport->generateReport();
				die();
			}
			else {
				$docReport = new ReportMakerDoc($_POST);
				$filename = time() . '_' . $projectId . '.doc';				
				header('Content-Type: application/msword');  
				header('Content-Disposition: attachment;filename="' . $filename . '"');
				$docReport->generateReport();
				die();
			}
		}		
	}
	
	protected function pageAjax() {
		$action=$_GET['action'];
		
		switch ($action):
			case 'get_prices':
				$library_name = $_GET['library_name'];
				$prices = ProjectManager::getPrices($library_name);
				echo json_encode($prices);
				break;
			default:
				echo '?';
		endswitch;
	}
	
	protected function pageSaveas() {
		global $T;
		
		if (isset($_GET['project_id'])) {
			$projectId = $_GET['project_id'];
			$newName = $_GET['new_name'];

			if ($projectId && $newName) {
				$newProjectId = ProjectManager::addCopy($projectId, $newName); 
				if ($newProjectId) {
					header("Location: index.php?route=estimate&id=".$newProjectId);
					die();
				}
			}
			else {
				$T['success'] = false;
				$this->addErrorMessage('Failed to save project');
				throw new Exception("Some error occured");
			}
		}
	}
	
	protected function pageDelete() {
		global $T;
		
		if (isset($_POST['project_id'])) {
			$projectId = $_POST['project_id'];

			$project = ProjectManager::getById($projectId);

			if ($project) {
				$result = ProjectManager::deleteById($projectId); 
				if ($result) {
					echo 'ok';
					die();
				}
			}
			$T['success'] = false;
			$this->addErrorMessage('Failed to delete project');	
			throw new Exception("Some error occured");
		}
	}
	
}