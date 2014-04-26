<?php

$config = array(
	'mysql_server' => 'localhost',
	'mysql_database' => 'calculators',
	'mysql_user' => 'calculator_user',
	'mysql_password' => '123',
	'table_prefix' => 'clc_',
	'assets_path' => '../common/'// path to common JS, CSS files
);

/* Variables for settings from outside sources */
	$_user_id = isset($_SESSION['id']) ? $_SESSION['id'] : 23;
	$_user_name = isset($_SESSION['usern']) ? $_SESSION['usern'] : 'Unknown';
	$_user_email = isset($_SESSION['usern']) ? $_SESSION['usern'] : 'unknown@email.adress';


	$T = array(
		'user_id' => $_user_id,
		'user_name' => $_user_name,
		'user_email' => $_user_email,
		'messages' => array()
	);