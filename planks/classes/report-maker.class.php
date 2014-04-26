<?php


class ReportMaker {
	
		
	protected $productCodes = array(
		"product" => array(
			"hardieplank_select_cedar_mill" => "HardiePlank Select Cedar Mill",
			"hardieplank_smooth" => "HardiePlank Smooth",
		),
		"type_of_frame" => array(
			"steel_0.55_to_1.66mm_bmt" => "Steel 0.55 to 1.66 mm BMT",
			"timber" => "Timber",
			"masonry_substrate" => "Masonry Substrate"
		),
		"wind_zone" => array(
			"1_up_to_9m" => "I (up to 9m )",
			"2_up_to_18m" => "II (up to 18m )",
			"3_up_to_18m" => "III (up to 18m )",
		)
	);
	
}

class ReportMakerXls extends ReportMaker {
	
	public $objPHPExcel = false;
	
	private $row = 0;
	
	private $data = array();
	
	private $project_data = array();
	
	private $styles = array(
		'default' => array(
			'font' => array(
				'bold' => true,
				'size' => 16,
			),
			'alignment' => array(
				'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
			)
		),
		// small header
		'sml_hd' => array(
			'font' => array(
				'bold' => true,
				'size' => 12,
			),
			'alignment' => array(
				'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
			),
		),
		// small number
		'sml_nm' => array(
			'font' => array(
				'bold' => false,
				'size' => 12,
			),
			'alignment' => array(
				'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
			),
		)
	);
	
	public function __construct($data) {
		$this->objPHPExcel = new PHPExcel();
		$this->data = $data;
		$this->project_data = json_decode(stripslashes($data["project_data"]),true);
	}

	public function generateReport() {
		$this->writeHeader();
		$this->writeContent();
		$this->formatList();
		
		$this->out();
	}
	
	private function writeHeader() {
		$this->objPHPExcel->setActiveSheetIndex(0);
		$this->setCellValue('A1', 'Bill of Quantities');
		
		$this->setCellValue('A3','Important Note','sml_hd');
		$this->setCellValue('A4', 'Information entered and generated through the use of these tools may be accessed by James Hardie and used to help identify further opportunities for use of Scyon™ and James Hardie products and to reduce users’ on the walls costs.','sml_nm');
		$this->setCellValue('A7', 'Disclaimer','sml_hd');
		$this->setCellValue('A8', 'The quantities estimated by this calculator must be checked by an estimator. To the extent permitted at law, James Hardie has no liability for any loss or damage arising from or in connection with the use or otherwise of this information. See [legal button] for full terms and conditions of use.','sml_nm');

		$this->setCellValue('A10', 'Title','sml_hd');
		$this->setCellValue('B10', $this->project_data['step1']['project_name'],'sml_nm');

		$this->setCellValue('A11', 'Date','sml_hd');
		$this->setCellValue('B11', $this->data['project']['date'],'sml_nm');

		$this->setCellValue('A12', 'Address','sml_hd');
		$this->setCellValue('B12', $this->data['project']['address'],'sml_nm');

		$this->setCellValue('A13', 'Post Code','sml_hd');
		$this->setCellValue('B13', $this->data['project']['postcode'],'sml_nm');

		$this->setCellValue('A14', 'Username','sml_hd');
		$this->setCellValue('B14', $this->data['user_name'],'sml_nm');

		$this->setCellValue('A15', 'Email','sml_hd');
		$this->setCellValue('B15', $this->data['user_email'],'sml_nm');
		
		$this->setCellValue('A20', 'ID Number','sml_hd');
		$this->setCellValue('B20', 'Description','sml_hd');
		$this->setCellValue('C20', 'Quantity','sml_hd');
		$this->setCellValue('D20', 'Unit','sml_hd');
		$this->setCellValue('E20', 'Cost/Unit (php)','sml_hd'); // if hidecost = off

		$this->objPHPExcel->setActiveSheetIndex(0);
	
	}
	
	private function writeContent() {

		$columnName = array(0=>"A",1=>"B",2=>"C",3=>"D",4=>"E",5=>"F",6=>"G",7=>"H");
		$columnContent = array(
			0 => 'id_number',
			1 => 'description',
			2 => 'quantity',
			3 => 'unit',
			4 => 'cost_unit'
		);
		
		$this->row = 21;

		foreach($this->data['bill'] as $key => $item) {
			foreach($columnContent as $columnNumber => $field) {
			$column = $columnName[$columnNumber];
			$cellAddress = $column . $this->row;
				$this->setCellValue($cellAddress, $item[$field],'sml_nm');
			}
			$this->row++;
		}
		
		$this->setCellValue('D'.$this->row,'Total cost:');
		$this->setCellValue('E'.$this->row, $this->data['total_cost'] . ' php');	
		
		$this->row++;
		$this->setCellValue('D'.$this->row,'Total cost per m2:');
		$this->setCellValue('E'.$this->row, $this->data['total_cost_per_m'] . ' php');	

		$this->row += 3;

		$this->setCellValue('A'.$this->row, 'STEP_1 Product Information','sml_hd');

		$this->row++;
		$this->setCellValue('A'.$this->row, 'Product Name','sml_hd');
		$this->setCellValue('B'.$this->row, 'Stud & Fastener Spacing','sml_hd');
		$this->setCellValue('C'.$this->row, 'Wind Zone','sml_hd');
		$this->setCellValue('D'.$this->row, 'Type of Frame','sml_hd');
		$this->setCellValue('E'.$this->row, 'Allowance','sml_hd');
		$this->setCellValue('F'.$this->row, 'Total wall area','sml_hd');
		$this->setCellValue('G'.$this->row, 'Total gable area','sml_hd');
		$this->setCellValue('H'.$this->row, 'Total_opening area','sml_hd');
		
		$this->row++;
		$productCode = $this->project_data["step1"]["product"];
		$productName = $this->productCodes['product'][$productCode];
		$this->setCellValue('A'.$this->row,$productName,'sml_nm');
		
		$this->setCellValue('B'.$this->row,$this->data['spacing'],'sml_nm');
		
		$productCode = $this->project_data["step1"]["wind_zone"];
		$productName = $this->productCodes['wind_zone'][$productCode];
		$this->setCellValue('C'.$this->row,$productName,'sml_nm');
		
		$typeOfFrameCode = $this->project_data["step1"]["type_of_frame"];
		$typeOfFrameName = $this->productCodes['type_of_frame'][$typeOfFrameCode];
		$this->setCellValue('D'.$this->row,$typeOfFrameName,'sml_nm');
		
		$allowance = $this->project_data["step1"]["allowance"];
		$this->setCellValue('E'.$this->row,$allowance,'sml_nm');

		$this->setCellValue('F'.$this->row,$this->project_data["step2"]['total_wall_area'],'sml_nm');
		$this->setCellValue('G'.$this->row,$this->project_data["step3"]['total_gable_area'],'sml_nm');
		$this->setCellValue('H'.$this->row,$this->data['total_opening_area'],'sml_nm');

		$this->row += 3;
		$this->setCellValue('A'.$this->row," STEP_2  Wall & Openings  ",'sml_hd');

		$this->row++;
		$this->setCellValue('B'.$this->row,'Width(mm)','sml_hd');
		$this->setCellValue('C'.$this->row,'Length(mm)','sml_hd');
		$this->setCellValue('D'.$this->row,'Area(m2)','sml_hd');
		
		$i = 0;
		foreach($this->project_data["step2"]["walls"] as $key => $wall) {
			$i++;
			$this->row++;
			$this->setCellValue('A'.$this->row,'Wall ' . $i,'sml_nm');
			$this->setCellValue('B'.$this->row,$wall["width"],'sml_nm');
			$this->setCellValue('C'.$this->row,$wall["length"],'sml_nm');
			$this->setCellValue('D'.$this->row,$wall["size"],'sml_nm');
			if (isset($this->project_data["step2"]["openings"][$key])){
				$j = 0;
				foreach($this->project_data["step2"]["openings"][$key] as $key2 => $opening) {
					$j++;
					$this->row++;
					$this->setCellValue('A'.$this->row,'Opening ' . $j,'sml_nm');
					$this->setCellValue('B'.$this->row,$opening["width"],'sml_nm');
					$this->setCellValue('C'.$this->row,$opening["height"],'sml_nm');
					$this->setCellValue('D'.$this->row,$opening["size"],'sml_nm');
				}
			}
		}
		
				$this->row += 3;
		$this->setCellValue('A'.$this->row," STEP_3  Gables ",'sml_hd');

		$this->row++;
		$this->setCellValue('B'.$this->row,'Base(mm)','sml_hd');
		$this->setCellValue('C'.$this->row,'Height(mm)','sml_hd');
		$this->setCellValue('D'.$this->row,'Area(m2)','sml_hd');
		
		$i = 0;
		foreach($this->project_data["step3"]["gables"] as $key => $gable) {
			$i++;
			$this->row++;
			$this->setCellValue('A'.$this->row,'Gable ' . $i,'sml_nm');
			$this->setCellValue('B'.$this->row,$gable["base"],'sml_nm');
			$this->setCellValue('C'.$this->row,$gable["height"],'sml_nm');
			$this->setCellValue('D'.$this->row,$gable["size"],'sml_nm');
		}
		
		$this->row += 2;
		$this->setCellValue('B'.$this->row,'Total product estimation (m2)','sml_hd');
		$this->setCellValue('C'.$this->row,$this->data['total_product_estimation'],'sml_hd');
	}
	
	private function formatList() {
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(50);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(50);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
		$this->objPHPExcel->getActiveSheet()->getColumnDimension('H')->setAutoSize(true);

		$this->objPHPExcel->getActiveSheet()->getStyle('A')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('B')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('C')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('D')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('E')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('F')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('G')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
		$this->objPHPExcel->getActiveSheet()->getStyle('H')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
	}
	
	private function out() {
		$objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
		$objWriter->save('php://output');
	}
	
	private function setCellValue($address,$value,$styleName = 'default') {
		$this->objPHPExcel
			->setActiveSheetIndex(0)
			->setCellValue($address, $value);
		$this->objPHPExcel
			->getActiveSheet(0)
			->getStyle($address)
			->applyFromArray($this->styles[$styleName]);
	}
}


class ReportMakerDoc extends ReportMaker {
	
	private $out = false;
	
	private $data = array();
	
	private $project_data = array();
	
	public function __construct($data) {
		$this->data = $data;
		$this->project_data = json_decode(stripslashes($data["project_data"]),true);
	}

	public function generateReport() {
		$this->writeHeader();
		$this->writeContent();		
		$this->out();
	}
	
	private function writeHeader() {
		$this->b('Bill of Quantities');
		$this->br();
		$this->out .= "________________________________________________________";
		$this->br();
		$this->b('Important Note');
		$this->br();
		$this->out .= 'Information entered and generated through the use of these tools may be accessed by James Hardie and used to help identify further opportunities for use of Scyon(tm) and James Hardie products and to reduce users\' on the walls costs';
		$this->br();
		$this->br();
		$this->b('Disclaimer');
		$this->br();
		$this->out .= 'The quantities estimated by this calculator must be checked by an estimator. To the extent permitted at law, James Hardie has no liability for any loss or damage arising from or in connection with the use or otherwise of this information. See [legal button] for full terms and conditions of use';
		$this->br();
		$this->br();
		$this->out .= 'Title: ';
		$this->b($this->project_data['step1']['project_name']);
		$this->br();
		$this->out .= 'Date: ';
		$this->b($this->data['project']['date']);
		$this->br();
		$this->out .= 'Address: ';
		$this->b($this->data['project']['address']);
		$this->br();
		$this->out .= 'Post Code: ';
		$this->b($this->data['project']['postcode']);
		$this->br();
		$this->out .= 'Username: ';
		$this->b($this->data['user_name']);
		$this->br();
		$this->out .= 'Email: ';
		$this->b($this->data['user_email']);
		$this->br();
		$this->br();
		$this->out .=  "<table border=0><tr><td>ID Number</td><td> Description</td><td> Quantity</td><td> Unit</td><td> Cost/Unit (php)</td></tr>";
	
	}
	
	private function writeContent() {

		$columnContent = array(
			0 => 'id_number',
			1 => 'description',
			2 => 'quantity',
			3 => 'unit',
			4 => 'cost_unit'
		);
		
		$this->row = 21;

		foreach($this->data['bill'] as $key => $item) {
			$this->out .= "<tr>";
			foreach($columnContent as $columnNumber => $field) {
				$this->td($item[$field]);
			}
			$this->out .= "</tr>";
		}
		$this->out .= "</table>";
		$this->br();
		$this->br();
		
		$this->out .= 'Total cost: ';
		$this->b($this->data['total_cost'] . ' php');	
		$this->br();
		$this->out .= 'Total cost per m2: ';
		$this->b($this->data['total_cost_per_m'] . ' php');	

		$this->br();
		$this->br();
		$this->br();

		$this->out .= 'All James Hardie products must be installed and maintained in strict accordance to the James Hardie installation instructions';
		$this->br();
		$this->br();
		$this->b('STEP 1: Product Information');
		$this->br();
		$this->br();
		
		$this->b('Product Name: ');
		$productCode = $this->project_data["step1"]["product"];
		$productName = $this->productCodes['product'][$productCode];
		$this->out .= $productName;
		$this->br();
		
		$this->b('Stud & Fastener Spacing: ');
		$this->out .= $this->data['spacing'];
		$this->br();
		
		$this->b('Wind Zone: ');
		$productCode = $this->project_data["step1"]["wind_zone"];
		$productName = $this->productCodes['wind_zone'][$productCode];
		$this->out .= $productName;
		$this->br();
		
		$this->b('Type of Frame: ');
		$typeOfFrameCode = $this->project_data["step1"]["type_of_frame"];
		$typeOfFrameName = $this->productCodes['type_of_frame'][$typeOfFrameCode];
		$this->out .= $typeOfFrameName;
		$this->br();
		
		$this->b('Allowance: ');
		$allowance = $this->project_data["step1"]["allowance"];
		$this->out .= $allowance;
		$this->br();
		
		$this->b('Total wall area, m2: ');
		$this->out .= $this->project_data["step2"]['total_wall_area'];
		$this->br();
		
		$this->b('Total gable area, m2: ');
		$this->out .= $this->project_data["step3"]['total_gable_area'];
		$this->br();
		
		$this->b('Total opening area, m2: ');
		$this->out .= $this->data['total_opening_area'];
		$this->br();
		
		$this->br();
		$this->br();
		$this->br();

		$this->b(" STEP 2: Wall & Openings   ");
		$this->br();
		$this->br();
		
		$i = 0;
		foreach($this->project_data["step2"]["walls"] as $key => $wall) {
			$i++;
			$this->out .= '<b>Wall ' . $i . "</b>: <br>Width " . $wall["width"] . 'mm ' 
					. ', Length: ' . $wall["length"]. 'mm '
					. ', Size: '. $wall["size"]. 'm2 ';
			$this->br();	
			$this->br();
			
			if (isset($this->project_data["step2"]["openings"][$key])){
				$j = 0;
				foreach($this->project_data["step2"]["openings"][$key] as $key2 => $opening) {
					$j++;
					$this->out .= '-------<b>Opening ' . $j . "</b>: Width: " . $opening["width"] . 'mm '
					. ', Height: ' . $opening["height"] . 'mm '
					. ', Size: '. $opening["size"] . 'm2 ';
					$this->br();
					$this->br();
				}
			}
		}
			
		$this->br();
		$this->br();
				
		$this->b("STEP_3  Gables  ");
		$this->br();
		$this->br();
		
		$i = 0;
		foreach($this->project_data["step3"]["gables"] as $key => $gable) {
			$i++;
			$this->row++;
			$this->out .= '<b>Gable ' . $i . "</b>: Width: " . $gable["base"] . 'mm '
					. ', Height: ' . $gable["height"] . 'mm '
					. ', Size: '. $gable["size"] . 'm2 ';
			$this->br();	
			
		}
		
		$this->b('Total product estimation (m2): ');
		$this->out .= $this->data['total_product_estimation'];

	}
	
	
	private function b($text){
		$this->out .= '<b>'.$text.'</b>';
	}
	
	private function td($text){
		$this->out .= '<td>'.$text.'</td>';
	}
	
	private function br(){
		$this->out .= '<br>';
	}
	
	private function out() {
		echo $this->out;
	}
	
	
}