<?php

/**
 * Global variables
 */
	
	global $DB;		// DB handler
	global $ROUTE;	// path taken from $_GET['route']
	global $CONF;	// configuration
	global $T;		// variables sent to the template


/**
 * Include shared classed and libs
 */
	include('..' . DIRECTORY_SEPARATOR .'common' . DIRECTORY_SEPARATOR .'adodb' . DIRECTORY_SEPARATOR .'adodb.inc.php');
	include('..' . DIRECTORY_SEPARATOR .'common' . DIRECTORY_SEPARATOR .'project-manager.class.php');
	include('..' . DIRECTORY_SEPARATOR .'common' . DIRECTORY_SEPARATOR .'calculator-controller.class.php');

/**
 * Include calculator-specific classes
 */
	include('classes' . DIRECTORY_SEPARATOR .'flooring-controller.class.php');
	//include('classes' . DIRECTORY_SEPARATOR .'xls-writer.class.php');

/**
 * Include configuration file and initialize configuration
 */
	include('config.inc.php');
	$CONF = $config; // taken from config.inc.php

/**
 * Determine current design theme and load theme-related classes
 */
	$themeName = $CONF['theme'];
	$classes = array(
		'partials'
	);
	
	foreach ($classes as $className) {
		include 'classes' . DIRECTORY_SEPARATOR . $themeName . DIRECTORY_SEPARATOR . $className . '.class.php';
	}

	$_manager_name = isset($_SESSION['manager_name']) ? $_SESSION['manager_name'] : 'Jenny Razor';


	$T = array(
		'manager_name' => $_manager_name,
		'messages' => array()
	);

	$DB = ADONewConnection('mysql'); # eg 'mysql' or 'postgres'

	$DB->debug = false;
	$DB->Connect($CONF['mysql_server'], $CONF['mysql_user'], $CONF['mysql_password'], $CONF['mysql_database']);

	$controller = new FlooringController();

	$controller->route();

?>
