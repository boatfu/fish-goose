DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `status` int(4) DEFAULT NULL,
  `update_time` int(15) DEFAULT NULL,
  `create_time` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;