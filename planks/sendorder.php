<?php 
    $data = $_GET['data'];
	session_start();
	$usernm = isset($_SESSION['usernm']) ? $_SESSION['usernm'] : 'John Doe';  
	$email = isset($_SESSION['email']) ? $_SESSION['email'] : 'john@doe.org';
	$company = isset($_SESSION['company']) ? $_SESSION['company'] : 'Company Name';
 //   print_r($data);
?>


<html>
<!-- <script language="javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" ></script>
<script language="javascript"  src="http://jquery-ui.googlecode.com/svn/tags/latest/ui/jquery-ui.js"></script>
	<script language="javascript" src="jquery.js" ></script> -->

<link href="css/st6.css" rel="stylesheet" type="text/css">

	<head>
		<title>Send your bill of quantites to your distributor</title>

		<script src="../common/js/jquery.min.js" type="text/javascript"></script>
		<script src="../common/js/jquery.validate.min.js" type="text/javascript"></script>
		
		<script type="text/javascript">
			$(document).ready(function(){
				$("#orderformx").validate();
				$('#add_file_btn').click(function() {
					var clo = '<div><input type="file" name="files[]" /> <a href="#" onclick="delme(this)">Remove</a></div>';
					$('#upload_container').append(clo);
				});

				$("#submitlink").click ( function () {
					$('#orderformx').submit();
					return false;
				})
			});  

			function delme(obj) {
				var o = obj.parentNode
				o.parentNode.removeChild(o);
			}
		</script>
	</head>
		
	<body>
		<table width="472"><tr><td class="Product_headingsSML">
			<font color="#000000">Send your bill of quantities to your 
			distributor<br></font></td></tr></table>
		<form method='post' action='submit.php' enctype='multipart/form-data' id='orderformx' >
			<table>
				<tr>
					<td class="Field_text">Date:<?php echo date("Y-m-d H:i:s"); ?><input type="hidden" name="datetime" value="<?php echo date("Y-m-d H:i:s"); ?>" /></td>
					<td class="Field_text">&nbsp;</td>
				</tr>
				<tr>
					<td class="Field_text">Distributor name</td>
					<td class="Field_text">
					<input type="text" name="distributor_name" value="" size="32" class="Field_text1 required" /></td>
				</tr>
				<tr>
					<td class="Field_text">Distributor contact name</td>
					<td class="Field_text">
					<input type="text" name="distributor_contact_name" value="" size="32" class="Field_text1 required" /></td>
				</tr>
				<tr>
					<td class="Field_text">Distributor email address</td>
					<td class="Field_text">
					<input type="text" name="distributor_email_address" value="" class="Field_text1 required "  size="32" /></td>
				</tr>
				<tr>
					<td class="Field_text">Username</td><td class="Field_text">
					<input type="text" name="username" value="<?php echo $usernm; ?>"  class="Field_text1 required" size="32"  /></td>
				</tr>
				<tr>
					<td class="Field_text">Company</td><td class="Field_text">
					<input type="text" name="company" value="<?php echo  $company; ?>"  class="Field_text1 required" size="32"  /></td>
				</tr>
				<tr>
					<td class="Field_text">Contact phone number</td>
					<td class="Field_text">
					<input type="text" name="contact_phone_number" value=""  class="Field_text1 required" size="32" /></td>
				</tr>
				<tr>
					<td class="Field_text">Contact email</td>
					<td class="Field_text">
					<input type="text" name="contact_email" value="<?php echo $email; ?>" class="Field_text1 required" size="32" /></td>
				</tr>
				<tr>
					<td class="Field_text">Attach files(<a href="#" id="add_file_btn">Add</a>)</td>
					<td id="upload_container" class="Field_text"><div><input type="file" name="files[]" /></div></td>
				</tr>
		<tr><td class="Field_text" colspan=2><font color="#aa1111" >Note: The Bill of Quantities of this project has already been added. 
		You may add the bill of quantities WORD or EXCEL document of another project by using the above add button' </font></td></tr>
				<tr>
					<td class="Field_text">Message</td><td class="Field_text">
					<textarea name="message" rows="2" cols="27"><?php echo($data); ?></textarea></td>
				</tr>
				<tr>
					<td colspan="2">
                    <input type="hidden" value='<?php echo $data ?>' name="data" />
                    <input type="submit" value="Send" /></td>
				</tr>
				
			</table>
		</form>
	</body>
</html>