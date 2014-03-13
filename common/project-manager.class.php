<?php

/**
 * This class implements projects CRUD (creating, saving & loading)
 *
 
CREATE TABLE IF NOT EXISTS `clc_project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(100) NOT NULL,
  `project_name` varchar(500) NOT NULL,
  `project_type` varchar(100) NOT NULL,
  `project_data` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


 * 
 * @author mgongee
 */
class ProjectManager {

	/**
	 * Insert new project in DB
	 * @param array $data raw field values for MySQL table
	 * @return boolean
	 * @throws Exception
	 */
	static public function addNew($data) {
		global $DB,$CONF, $T;
		
		$tableName = $CONF['table_prefix'] . 'project';
		
		$sql = "INSERT INTO `$tableName` ( `project_id`, `manager_name`, `project_name`, `project_type`, `project_data`, `created_at`)
				VALUES ('',
				'" . mysql_real_escape_string($data['manager_name']) . "',
				'" . mysql_real_escape_string($data['project_name']) . "',
				'" . mysql_real_escape_string($data['project_type']) . "',
				'" . mysql_real_escape_string($data['project_data']) . "',
				CURRENT_TIMESTAMP)";
		
		if ($DB->Execute($sql) === false) {
			throw new Exception(sprintf('error inserting in DB: %s in %s. SQL QUERY: %s', $DB->ErrorMsg(), __METHOD__, $sql));
		}
		else {
			return $DB->Insert_ID();
		}
	}
	
	
	/**
	 * Updates specified project in DB
	 * @param array $data raw field values for MySQL table
	 * @return boolean
	 * @throws Exception
	 */
	static public function update($projectId, $data) {
		global $DB,$CONF, $T;
		
		$tableName = $CONF['table_prefix'] . 'project';
		
		$sql = "UPDATE `$tableName` SET 
			`project_name` = '" . mysql_real_escape_string($data['project_name']) . "',
			`project_data` = '" . mysql_real_escape_string($data['project_data']) . "'
			WHERE project_id = " . intval($projectId);
		
		if ($DB->Execute($sql) === false) {
			throw new Exception(sprintf('error updating in DB: %s in %s. SQL QUERY: %s', $DB->ErrorMsg(), __METHOD__, $sql));
		}
		else {
			return true;
		}
	}
	
	/**
	 * Processes form input and saves new project to DB
	 * @param array $formData _POST field values
	 * @return bool
	 */
	static public function addFromForm($formData) {
		global $DB,$CONF;
		
		$data = array(
			'manager_name' => $formData['manager_name'],
			'project_name' => $formData['step1']['project_name'],
			'project_type' => $formData['project_type'],
		);
		
		
		$stepData = array();
		
		foreach ($formData as $stepName => $formStepData) {
			if (is_array($stepData)) { // Step Data comes in arrays 'step1','step2', etc. 
				$stepData[$stepName] = $formStepData;
			}
		}
		
		$data['project_data'] = json_encode($stepData);
		
		return ProjectManager::addNew($data);
	}
	
	/**
	 * Processes form input and updates existing project in DB
	 * @param array $formData _POST field values
	 * @return bool
	 */
	static public function updateFromForm($projectId, $formData) {
		global $DB,$CONF;
		
		$data = array(
			'project_name' => $formData['step1']['project_name'],
		);
		
		
		$stepData = array();
		
		foreach ($formData as $stepName => $formStepData) {
			if (is_array($stepData)) { // Step Data comes in arrays 'step1','step2', etc. 
				$stepData[$stepName] = $formStepData;
			}
		}
		
		$data['project_data'] = json_encode($stepData);
		
		return ProjectManager::update($projectId,$data);
	}
	
	static public function getAll() {
		global $DB, $CONF;
		$tableName = $CONF['table_prefix'] . 'project';
		
		$rows = array();
		$rs = $DB->Execute("SELECT * FROM `$tableName`");
		while ($array = $rs->FetchRow()) {
			$rows[] = $array;
		}
		return $rows;
	}
	
	static public function getById($project_id) {
		global $DB, $CONF;
		$tableName = $CONF['table_prefix'] . 'project';
		
		$rs = $DB->Execute("SELECT * FROM `$tableName` WHERE project_id = " . intval($project_id));
		while ($array = $rs->FetchRow()) {
			$row = $array;
		}
		return $row;
	}
}
?>
