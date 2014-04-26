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
	include('..' . DIRECTORY_SEPARATOR .'common' . DIRECTORY_SEPARATOR .'PHPExcel' . DIRECTORY_SEPARATOR . 'PHPExcel.php');

/**
 * Include calculator-specific classes
 */
	include('classes' . DIRECTORY_SEPARATOR .'matrix-controller.class.php');
	include('classes' . DIRECTORY_SEPARATOR .'report-maker.class.php');

/**
 * Include configuration file and initialize configuration
 */
	include('..' . DIRECTORY_SEPARATOR . 'common' . DIRECTORY_SEPARATOR . 'config.inc.php');
	$CONF = $config; // taken from config.inc.php	

	$DB = ADONewConnection('mysql'); # eg 'mysql' or 'postgres'

	$DB->debug = false;
	$DB->Connect($CONF['mysql_server'], $CONF['mysql_user'], $CONF['mysql_password'], $CONF['mysql_database']);

	$controller = new MatrixController();

	$controller->route();

?>
