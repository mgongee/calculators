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

CREATE TABLE IF NOT EXISTS `user_pricesx` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL DEFAULT '0',
  `pid` varchar(90) NOT NULL DEFAULT '',
  `price` varchar(10) NOT NULL DEFAULT '',
  `list_name` varchar(50) NOT NULL,
  `active` varchar(15) NOT NULL,
  `fromp` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

CREATE TABLE IF NOT EXISTS `Costlib_pass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `password` varchar(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;
 * 
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
	 * Insert copy of existing project in DB, gives it a new name
	 * @return integer last inserted id
	 * @throws Exception
	 */
	static public function addCopy($projectId, $newName) {
		global $DB,$CONF;
		
		$project = ProjectManager::getById($projectId);
		$tableName = $CONF['table_prefix'] . 'project';
		
		$sql = "INSERT INTO `$tableName` ( `project_id`, `manager_name`, `project_name`, `project_type`, `project_data`, `created_at`)
				VALUES ('',
				'" . mysql_real_escape_string($project['manager_name']) . "',
				'" . mysql_real_escape_string($newName) . "',
				'" . mysql_real_escape_string($project['project_type']) . "',
				'" . mysql_real_escape_string($project['project_data']) . "',
				CURRENT_TIMESTAMP)";
		
		if ($DB->Execute($sql) === false) {
			throw new Exception(sprintf('error inserting in DB: %s in %s. SQL QUERY: %s', $DB->ErrorMsg(), __METHOD__, $sql));
		}
		else {
			return $DB->Insert_ID();
		}
	}
	
	/**
	 * Deletes project
	 * @throws Exception
	 */
	static public function deleteById($projectId) {
		global $DB,$CONF;
		
		$tableName = $CONF['table_prefix'] . 'project';
		
		$sql = "DELETE FROM `$tableName` WHERE `project_id` = " . $projectId . " LIMIT 1";
		
		if ($DB->Execute($sql) === false) {
			throw new Exception(sprintf('error deleting in DB: %s in %s. SQL QUERY: %s', $DB->ErrorMsg(), __METHOD__, $sql));
		}
		else return true;
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
	
	static public function getAll($type) {
		global $DB, $CONF;
		$tableName = $CONF['table_prefix'] . 'project';
		
		$rows = array();
		$rs = $DB->Execute("SELECT * FROM `$tableName` WHERE project_type = '" . $type . "'" );
		while ($array = $rs->FetchRow()) {
			$rows[] = $array;
		}
		return $rows;
	}
	
	static public function getById($projectId) {
		global $DB, $CONF;
		$tableName = $CONF['table_prefix'] . 'project';
		
		$row = false;
		
		$rs = $DB->Execute("SELECT * FROM `$tableName` WHERE project_id = " . intval($projectId));
		while ($array = $rs->FetchRow()) {
			$row = $array;
		}
		return $row;
	}
	
	static public function getCostLibraries() {
		global $DB,$T;
		$tableName = 'user_pricesx';
		
		$manager_id = $T['manager_id'];
		$rows = array();
		$rs = $DB->Execute("SELECT DISTINCT list_name FROM `$tableName` WHERE uid = " . intval($manager_id) . " ORDER BY list_name");
		while ($array = $rs->FetchRow()) {
			$rows[] = $array;
		}
		return $rows;
	}
	
	static public function getPrices($library_name) {
		global $DB,$T;
		$tableName = 'user_pricesx';
		
		$manager_id = $T['manager_id'];
		$rows = array();
		$rs = $DB->Execute("SELECT * FROM `$tableName` WHERE uid = " . intval($manager_id) . " AND list_name= '" . $library_name . "'");
		while ($array = $rs->FetchRow()) {
			$rows[] = $array;
		}
		return $rows;
	}
}
?>
