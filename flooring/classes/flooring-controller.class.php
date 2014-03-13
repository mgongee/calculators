<?php

/**
 * This is the main routing &cintroller class of the Flooring calculator
 */
class FlooringController extends CalculatorController{
	
	
	protected function pageIndex() {
		global $T;
		
		if (isset($_POST['action'])) {
			$projectId = ProjectManager::addFromForm($_POST);
			if ($projectId) {
				$this->addSuccessMessage('Project successfully saved');
				$_GET["id"] = $projectId;
				
				switch($_POST["action"]) :
				case "save":
					header("Location: index.php?route=edit&id=".$projectId);
					//return $this->pageEdit();
					break;
				case "estimate":
					header("Location: index.php?route=estimate&id=".$projectId);
					//return $this->pageEstimate();
					break;
				endswitch;
			}
			else {
				$this->addErrorMessage('Failed to save project');	
			}
		}
		else {
			$projects = ProjectManager::getAll();
			$projectList = array();

			foreach ($projects as $project) {
				$projectList[$project['project_id']] = $project['project_name'];
			}

			$T['projectList'] = $projectList;
			
		}
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}
	
	protected function pageAdd() {
		global $T;
		
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
		

		$project = ProjectManager::getById($projectId);

		if ($project) {
			$T['project'] = $project;
			$T['success'] = true;
		}
		else {
			$T['success'] = false;
			$this->addErrorMessage('Failed to load project with specified id = ' . $projectId);	
		}
		
		$templateName = __FUNCTION__;
		return $this->compose($templateName);
	}
	
	protected function pageEdit() {
		global $T;
		
		$action = "error";
		
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
			$this->addErrorMessage('Some error occured');	
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
				$content = ReportMaker::generateReportXls($_POST);
				$filename = time() . '_' . $projectId . '.xls';
				
				$headers = array(
					"Content-Type: application/vnd.ms-excel",
					"Content-Disposition: attachment; filename=$filename",
					"Pragma: no-cache",
					"Expires: 0"
				);
			}
			else {
				$content = ReportMaker::generateReportDoc($_POST);
				$filename = time() . '_' . $projectId . '.doc';				
				$headers = array(
					"Content-type: application/vnd.ms-word",
					"Content-Disposition: attachment;Filename=" . $filename
				);				
			}
		}		
		return $this->headers($headers,$content);
	}
}

class ReportMaker {
	
	public static function generateReportXls($data) {
		echo("<pre>" . print_r($data, 1) . "</pre>");
		die();
	}
	
}
