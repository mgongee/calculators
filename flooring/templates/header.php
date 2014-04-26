<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Flooring Calculator</title>

		<!-- Legacy CSS -->
		<link rel="stylesheet" href="templates/normalize.css">  
		<link rel="stylesheet" href="templates/basex.css">  
		<link rel="stylesheet" href="templates/legacy.css"/>
		<link rel="stylesheet" href="templates/jquery.jscrollpane.css"/>
		
		<!-- CSS for jquery plugins  -->
		<link rel="stylesheet" href="<?php echo $CONF['assets_path']; ?>/css/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	
		<!-- New CSS for this calculator -->
		<link href="templates/styles.css" rel="stylesheet" />
		
		<!-- jQuery -->
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery.min.js"></script>
				
		<!-- Include jquery plugins  -->
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery.validate.min.js"></script>
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery-ui-1.10.4.custom.min.js"></script>
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery.form.wizard.js"></script>
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery.mousewheel.js"></script>	
		<script src="<?php echo $CONF['assets_path']; ?>/js/jquery.fancybox.pack.js?v=2.1.5"></script>
		<script src="<?php echo $CONF['assets_path']; ?>/js/jScrollPane-eds.js"></script>

		<!-- JS for this calculator -->
		<script src="scripts/script.js"></script>
		
		<!-- Legacy JS -->
		<script src="scripts/encoder.js"></script>
		<script src="scripts/legacy.js"></script>
		
	</head>
<body>
	<div id="main-wrapper-div">
		<div id="main-header">
			<a class="logo" href="../main_JHaccess.php"><img src="templates/images/logomain.jpg" alt="ACCEL" width="369"></a>  
			<img class="mloginbg" src="templates/images/memberlogin.jpg" width="392" alt="" border="0" />
			<div id="member_login">
				<span class="welc">Welcome back <?php echo $user_name ?></span>
				<a class="edit" href="member-self-edit.php">Edit</a>
				<a class="logout" href="logout.php">Logout</a>
				<div style="display: none;">
				</div>
			</div> 
		</div>
		<div class="top-bl all-menu">
			<nav class="main-navigation">
				<ul>                                           
					<li><a href="../main_JHaccess.php">Home</a></li>   
					<li><a href="../change_user.php">Change User Type</a></li>  
					<li><a href="#1">ACCELConnect</a>
						<ul class="acccon">
							<li>Find a Distributor
								<form name="frm" id="frm" action="../postcode_finder.php" method="post" >
									<input class="postcode" style="font-size: 11px;" type="text" size="10" value="Enter Postcode"  name="postcode" id="postcode" onfocus="if (this.value=='Enter Postcode'){this.value=''};" onblur="if (this.value==''){this.value='Enter Postcode'};"/>
									<input name="ftype" type="hidden" value="D">
									<a href="#1" class="submit"><span>Go</span></a>
								</form>
							</li>
							<li>Find an Architect
								<form name="frm2" id="frm2" action="../postcode_finder.php" method="post" >
									<input class="postcode" style="font-size: 11px;" type="text" size="10" value="Enter Postcode"  name="postcode" id="postcode" onfocus="if (this.value=='Enter Postcode'){this.value=''};" onblur="if (this.value==''){this.value='Enter Postcode'};"/>
									<input name="ftype" type="hidden" value="A">
									<a href="#1" class="submit"><span>Go</span></a>
								</form>
							</li>
							<li>Find a Builder
								<form name="frm2" id="frm2" action="../postcode_finder.php" method="post" >
									<input class="postcode" style="font-size: 11px;" type="text" size="10" value="Enter Postcode"  name="postcode" id="postcode" onfocus="if (this.value=='Enter Postcode'){this.value=''};" onblur="if (this.value==''){this.value='Enter Postcode'};"/>
									<input name="ftype" type="hidden" value="B">
									<a href="#1" class="submit"><span>Go</span></a>
								</form>
							</li>
						</ul>
					</li>
					<li><a href="#1" class="searcha">Search <img height="13" border="0" alt="search" src="images/magnify.png" ></a>
						<ul class="searchul">
							<li>
								<script language="javascript">function killerrors(){return true;}window.onerror = killerrors;</script>
								<script language="javascript">function saveselection() {if (document.form_search.sw) document.cookie='sw='+escape(document.form_search.sw.value);};function readcookie(sname){var c=document.cookie;if (c.length<0) return false;var b=c.indexOf(sname+'=');if (b==-1) return false;var d=c.indexOf(';',b);if (d==-1) d=c.length;return unescape(c.substring(b+sname.length+1,d));};function readselection() {if (document.form_search.sw) {c=readcookie('sw');if (c) document.form_search.sw.value=c;};};</script>
								<script language="javascript">function checkData(){for(var i=0;i<document.form_search.sw.value.length;i++){if (document.form_search.sw.value.charAt(i)!=" "){saveselection();return true;}}return false;}</script>
								<form name="form_search" id="form_search" target="_blank" action="../searchresult.php" onSubmit="return checkData()">
									<input type="text" size="19" id="sw" name="sw">
									<a href="#1" class="submit"><span>Go</span></a>
									<script language="javascript">readselection();</script>
								</form> </li>
						</ul>
					</li>
					<li class="menu-item1"><a href="http://www.jameshardie.com.au/" target="_blank"><img src="/images/menu-item1.png" alt="" width="100"></a></li>
					<li class="menu-item2"><a href="http://www.scyon.com.au/"  target="_blank"><img src="/images/menu-item2.png" alt="" width="60"></a></li>
				</ul>
			</nav>
		</div>
