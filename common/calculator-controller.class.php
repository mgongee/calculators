<?php

/**
 * This is an abstract router & controller class for calculators
 *
 * @author mgongee
 */
class CalculatorController {

	public function route() {
		
		try {
			$route = isset($_GET['route']) ? $_GET['route'] : 'index';
			$methodName = 'page' . ucfirst($route);
			global $ROUTE;

			if(method_exists($this, $methodName)) {
				$ROUTE = $route;
				echo $this->$methodName(); // process and echo the templates
			} 
			else {
			  throw new Exception(sprintf('The required method "%s" does not exist for %s', $methodName, get_class($this)));
			}
		}
		catch (Exception $e) {
			global $T;
			$T['e'] = $e;

			echo $this->compose('pageError');
		} 
	}
	
	public function compose($templateName) {
		global $CONF;
		global $T;
		extract($T);
		
		$html = '';
		
		ob_start();
		
		$templateDir = 'templates' . DIRECTORY_SEPARATOR . $CONF['theme'] . DIRECTORY_SEPARATOR;
		
		include($templateDir . 'header.php');
		include($templateDir . $templateName .'.php');
		include($templateDir . 'footer.php');
		
		$html = ob_get_contents();
		ob_end_clean();
		
		return $html;
	}
	
	public function addErrorMessage($messageText) {
		global $T;
		$T['messages'][] = array(
			'style' => 'alert-danger',
			'text' => $messageText
		);
	}
	
	public function addSuccessMessage($messageText) {
		global $T;
		$T['messages'][] = array(
			'style' => 'alert-success',
			'text' => $messageText
		);
	}
}
?>
