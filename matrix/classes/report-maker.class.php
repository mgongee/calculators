<?php


class ReportMaker {
	
		
	protected $productCodes = array(
		"product" => array(
			"hardieflex_sheet" => "HardiePlank Sheets",
			"hardieflex_pro" => "HardiePlank Pro"
		),
		"type_of_frame" => array(
			"steel" => "Steel 0.55 to 1.66 mm BMT",
			"timber" => "Timber"
		),
		"application" => array(
			'ceiling_uninsulated' => 'Ceiling uninsulated<600',
			'dry_wall' => 'Dry wall fastener only',
			'wet_area_wall' => 'Wet Area Wall (same as untiled)'
		),
		"sheet_size" => array(
			'3.5mm_x_1219mm_x_2438mm'=> '3.5mm x 1219mm x 2438mm',
			'4.5mm_x_1219mm_x_2438mm'=> '4.5mm x 1219mm x 2438mm',
			'4.5mm_x_1200mm_x_2700mm'=> '4.5mm x 1200mm x 2700mm',
			'4.5mm_x_1200mm_x_3000mm'=> '4.5mm x 1200mm x 3000mm',
			'6mm_x_1219mm_x_2438mm'=> '6mm x 1219mm x 2438mm',
			'6mm_x_1200mm_x_2700mm'=> '6mm x 1200mm x 2700mm',
			'6mm_x_1200mm_x_3000mm'=> '6mm x 1200mm x 3000mm',
			'9mm_x_1219mm_x_2438mm'=> '9mm x 1219mm x 2438mm',
			'9mm_x_1200mm_x_2700mm'=> '9mm x 1200mm x 2700mm',
			'9mm_x_1200mm_x_3000mm'=> '9mm x 1200mm x 3000mm',
			'12mm_x_1219mm_x_2438mm'=> '12mm x 1219mm x 2438mm',
			'6mm_x_1250mm_x_2400mm'=> '6mm x 1250mm x 2400mm',
			'6mm_x_1200mm_x_2400mm'=> '6mm x 1200mm x 2400mm'
		),
		"orientation" => array(
			'h' => 'Horizontal',
			'v' => 'Vertical'
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
		$this->setCellValue('B'.$this->row, 'Application','sml_hd');
		$this->setCellValue('C'.$this->row, 'Type of Frame','sml_hd');
		$this->setCellValue('D'.$this->row, 'Allowance','sml_hd');
		$this->setCellValue('E'.$this->row, 'Waste','sml_hd');
		$this->setCellValue('F'.$this->row, 'Total wall area, m2','sml_hd');
		$this->setCellValue('G'.$this->row, 'Total_opening area, m2','sml_hd');
		
		$this->row++;
		$productCode = $this->project_data["step1"]["product"];
		$productName = $this->productCodes['product'][$productCode];
		$this->setCellValue('A'.$this->row,$productName,'sml_nm');
		
		$app_code = $this->project_data["step1"]["application"];
		$application = $this->productCodes['application'][$app_code];
		$this->setCellValue('B'.$this->row,$application,'sml_nm');
		
		$typeOfFrameCode = $this->project_data["step1"]["type_of_frame"];
		$typeOfFrameName = $this->productCodes['type_of_frame'][$typeOfFrameCode];
		$this->setCellValue('C'.$this->row,$typeOfFrameName,'sml_nm');
		
		$allowance = $this->project_data["step1"]["allowance"];
		$this->setCellValue('D'.$this->row,$allowance . '%','sml_nm');

		$waste = $this->project_data["step1"]["waste"];
		$this->setCellValue('E'.$this->row,$waste . '%','sml_nm');

		$this->setCellValue('F'.$this->row,$this->data['total_wall_area'],'sml_nm');
		$this->setCellValue('G'.$this->row,$this->data['total_opening_area'],'sml_nm');

		$this->row += 3;
		$this->setCellValue('A'.$this->row," STEP_2  Wall & Openings  ",'sml_hd');

		$this->row++;
		$this->setCellValue('A'.$this->row,'Sheet size','sml_hd');
		$this->setCellValue('B'.$this->row,'Orientation','sml_hd');
		$this->setCellValue('C'.$this->row,'Frame spacing','sml_hd');
		$this->setCellValue('D'.$this->row,'Fastener type','sml_hd');
		$this->setCellValue('E'.$this->row,'Number of fasteners per sheet','sml_hd');
		$this->setCellValue('F'.$this->row,'Amount of putty, mL','sml_hd');
		$this->setCellValue('G'.$this->row,'Amount of sealant, mL','sml_hd');
		$this->setCellValue('H'.$this->row,'Amount of paper tape, m','sml_hd');
		$this->setCellValue('I'.$this->row,'Height/Width(mm)','sml_hd');
		$this->setCellValue('J'.$this->row,'Length(mm)','sml_hd');
		$this->setCellValue('K'.$this->row,'Wall area(m2)','sml_hd');
		
		$i = 0;
		foreach($this->project_data["step2"]["walls"] as $key => $wall) {
			$i++;
			$this->row++;
			$this->setCellValue('A'.$this->row,$this->productCodes['sheet_size'][$wall["sheet_size"]],'sml_nm');
			$this->setCellValue('B'.$this->row,$this->productCodes['orientation'][$wall["orientation"]],'sml_nm');
			$this->setCellValue('C'.$this->row,$wall["frame_spacing"],'sml_nm');
			$this->setCellValue('D'.$this->row,$wall["fastener_type"],'sml_nm');
			$this->setCellValue('E'.$this->row,$wall["no_of_fasteners_per_sheet"],'sml_nm');
			$this->setCellValue('F'.$this->row,round($wall["amount_of_putty"]),'sml_nm');
			$this->setCellValue('G'.$this->row,round($wall["amount_of_sealant"]),'sml_nm');
			$this->setCellValue('H'.$this->row,round($wall["amount_of_tape"]/1000,1),'sml_nm');
			$this->setCellValue('I'.$this->row,$wall["height"],'sml_nm');
			$this->setCellValue('J'.$this->row,$wall["length"],'sml_nm');
			$this->setCellValue('K'.$this->row,$wall["size"],'sml_nm');
			
			
			if (isset($this->project_data["step2"]["openings"][$key])){
				$j = 0;
				foreach($this->project_data["step2"]["openings"][$key] as $key2 => $opening) {
					$j++;
					$this->row++;
					$this->setCellValue('H'.$this->row,'Opening ' . $j,'sml_nm');
					$this->setCellValue('I'.$this->row,$opening["width"],'sml_nm');
					$this->setCellValue('J'.$this->row,$opening["height"],'sml_nm');
					$this->setCellValue('K'.$this->row,$opening["size"],'sml_nm');
				}
			}
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
		
		$this->b('Application Name: ');
		$application = $this->project_data["step1"]["application"];
		$application = $this->productCodes['application'][$application];
		$this->out .= $application;
		$this->br();
		
		$this->b('Type of Frame: ');
		$typeOfFrameCode = $this->project_data["step1"]["type_of_frame"];
		$typeOfFrameName = $this->productCodes['type_of_frame'][$typeOfFrameCode];
		$this->out .= $typeOfFrameName;
		$this->br();
		
		$this->b('Allowance: ');
		$allowance = $this->project_data["step1"]["allowance"];
		$this->out .= $allowance . '%';
		$this->br();
		
		$this->b('Waste: ');
		$waste = $this->project_data["step1"]["waste"];
		$this->out .= $waste . '%';
		$this->br();
		
		$this->b('Total wall area, m2: ');
		$this->out .= $this->data['total_wall_area'];
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
			
		$this->out .=  "<table border=1><tr><td><b>Sheet size<b/></td><td><b>Orientation<b/></td><td><b>Frame spacing<b/></td><td><b>Fastener type<b/></td><td><b>Number of fasteners per sheet<b/></td><td><b>Height/Width(mm)<b/></td><td><b>Length(mm)<b/></td><td><b>Wall area(m2)</b></td></tr>";
	
		foreach($this->project_data["step2"]["walls"] as $key => $wall) {
			$i++;
			$this->out .= '<tr>'
					. '<td>' . $this->productCodes['sheet_size'][$wall["sheet_size"]] . '</td>' 
					. '<td>' . $this->productCodes['orientation'][$wall["orientation"]] . '</td>' 
					. '<td>' . $wall["frame_spacing"] . '</td>' 
					. '<td>' . $wall["fastener_type"] . '</td>' 
					. '<td>' . $wall["no_of_fasteners_per_sheet"] . '</td>' 
					. '<td>' . $wall["height"] . 'mm </td>' 
					. '<td>' . $wall["length"]. 'mm </td>'
					. '<td>'. $wall["size"]. 'm2 </td></tr>';
			
			if (isset($this->project_data["step2"]["openings"][$key])){
				$j = 0;
				foreach($this->project_data["step2"]["openings"][$key] as $key2 => $opening) {
					$j++;
					$this->out .= '<tr>'
					. '<td></td>' 
					. '<td></td>' 
					. '<td></td>' 
					. '<td></td>' 
					. '<td><b>Opening ' . $j . '</b></td>' 
					. '<td>' . $opening["width"] . 'mm </td>' 
					. '<td>' . $opening["height"]. 'mm </td>'
					. '<td>' . $opening["size"]. 'm2 </td></tr>';
					
				}
			}
		}
		
		$this->out .=  "</table>";
		
		$this->br();
		$this->br();
				
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