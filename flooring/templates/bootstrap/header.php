<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Flooring Calculator</title>

    <!-- common CSS -->
    <link href="<?php echo $CONF['assets_path']; ?>bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<?php echo $CONF['assets_path']; ?>bootstrap/css/common.css" rel="stylesheet" />
 	
    
	<!-- CSS for this calculator -->
	<link href="styles.css" rel="stylesheet" />
	
	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="<?php echo $CONF['assets_path']; ?>bootstrap/js/jquery.min.js"></script>
	
    <!-- Twitter Bootstrap -->
    <script src="<?php echo $CONF['assets_path']; ?>bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Include all compiled plugins (below), or include individual files as needed -->
    
    <script src="<?php echo $CONF['assets_path']; ?>bootstrap/js/jquery.validate.min.js"></script>
    <script src="<?php echo $CONF['assets_path']; ?>bootstrap/js/jquery-ui-1.8.5.custom.min.js"></script>
    <script src="<?php echo $CONF['assets_path']; ?>bootstrap/js/jquery.form.wizard.js"></script>
	
	<!-- JS for this calculator -->
	<script src="script.js"></script>
	
	
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

    <div class="container">
		<div class="page-header">
			<h1><a href="index.php?route=index">Flooring Calculator</a></h1>
		</div>
		
		<div class="calculator-template">
		  <?php echo CalculatorPartials::messages($messages); ?>
		  