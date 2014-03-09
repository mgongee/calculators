<?php

/**
 * Some chunks of code to insert into templates
 *
 * @author mgongee
 */
class CalculatorPartials {
	
	static public function messages($messages = '') {
	  if ((is_array($messages)) && (count($messages) > 0)) {
		foreach ($messages as $i => $message) {
				?>
		<div class="alert <?php echo $message['style']; ?> alert-dismissable">
		  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">X</button>
		  <?php echo $message['text']; ?>
		</div>
			  <?php
			}
		}
	}
}

?>
