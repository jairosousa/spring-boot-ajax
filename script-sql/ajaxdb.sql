-- MySQL --

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_blchllk6rtlb8h5n38wie0m5y` (`titulo`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

INSERT INTO `categorias` VALUES (1,'Informatica'),(2,'Cursos'),(3,'Eletrodomésticos'),(4,'Eletronicos'),(5,'Livros'),(6,'Móveis'),(7,'Cama, Mesa e Banho');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `promocoes`;
CREATE TABLE `promocoes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  `total_likes` int(11) DEFAULT '0',
  `link_imagem` varchar(255) DEFAULT NULL,
  `link_promocao` varchar(255) NOT NULL,
  `preco_promocao` decimal(19,2) NOT NULL,
  `site_promocao` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria_fk` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3bmg0833cdjdfaxom9l46thge` (`categoria_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;