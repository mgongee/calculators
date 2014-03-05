CREATE TABLE IF NOT EXISTS `clc_project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_email` varchar(100) NOT NULL,
  `project_name` varchar(500) NOT NULL,
  `project_type` varchar(100) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
