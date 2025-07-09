-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: Colegio_General
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `seccion` varchar(10) DEFAULT NULL,
  `grado_id` int DEFAULT NULL,
  `grado` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `asistencia` varchar(20) DEFAULT 'no registrado',
  `asistencia_estado` varchar(20) DEFAULT 'no registrado',
  `asistencia_hora` datetime DEFAULT NULL,
  `conteo_asistio` int DEFAULT '0',
  `conteo_tarde` int DEFAULT '0',
  `conteo_noasistio` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `grado_id` (`grado_id`),
  CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`grado_id`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (11,'Andreé',NULL,NULL,NULL,'V computacion','andre@cole.general.gt','55447580','estu0011','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(12,'Diamileth',NULL,NULL,NULL,'V compu','diami@cole.general.cole','21546589','estu0012','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(13,'Fernando',NULL,NULL,NULL,'V compu','fernando@cole.general.gt','84625169','estu0013','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(14,'Estrella',NULL,NULL,NULL,'V compu','estrella@cole.general.gt','31447985','estu0014','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(15,'Abigail',NULL,NULL,NULL,'V compu','abigail@cole.general.gt','63897412','estu0015','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(16,'Sharon',NULL,NULL,NULL,'V compu','sharon@cole.general.com','97899966','estu0016','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(17,'Kamila',NULL,NULL,NULL,'V compu','kamila@cole.general.gt','44568319','estu0017','asistio','no registrado','2025-07-07 08:32:23',2,0,1),(18,'Sebastian',NULL,NULL,NULL,'V compu','sebastian@cole.general.gt','33264512','estu0018','asistio','no registrado','2025-07-07 08:32:23',2,0,1);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos_contra`
--

DROP TABLE IF EXISTS `codigos_contra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos_contra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos_contra`
--

LOCK TABLES `codigos_contra` WRITE;
/*!40000 ALTER TABLE `codigos_contra` DISABLE KEYS */;
INSERT INTO `codigos_contra` VALUES (5,'112233'),(1,'123456'),(4,'210987'),(2,'654321'),(3,'789012');
/*!40000 ALTER TABLE `codigos_contra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grados`
--

DROP TABLE IF EXISTS `grados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_grado` varchar(100) DEFAULT NULL,
  `nivel_id` int DEFAULT NULL,
  `maestro_guia_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nivel_id` (`nivel_id`),
  KEY `maestro_guia_id` (`maestro_guia_id`),
  CONSTRAINT `grados_ibfk_1` FOREIGN KEY (`nivel_id`) REFERENCES `niveles_academicos` (`id`),
  CONSTRAINT `grados_ibfk_2` FOREIGN KEY (`maestro_guia_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grados`
--

LOCK TABLES `grados` WRITE;
/*!40000 ALTER TABLE `grados` DISABLE KEYS */;
INSERT INTO `grados` VALUES (1,'PreKinder',1,4),(2,'Kinder',1,5),(3,'Preparatoria',1,6),(4,'Primero Primaria',2,7),(5,'Segundo Primaria',2,8),(6,'Tercero Primaria',2,9),(7,'Cuarto Primaria',2,10),(8,'Quinto Primaria',2,11),(9,'Sexto Primaria',2,12),(10,'I Básico',3,13),(11,'II Básico',3,14),(12,'III Básico',3,15),(13,'IV Computación',4,16),(14,'IV Diseño',4,17),(15,'IV Biológicas',4,18),(16,'IV Perito',4,19),(17,'V Computación',4,20),(18,'V Diseño',4,21),(19,'V Biológicas',4,22),(20,'V Perito',4,23),(21,'VI Perito',4,24);
/*!40000 ALTER TABLE `grados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveles_academicos`
--

DROP TABLE IF EXISTS `niveles_academicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveles_academicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles_academicos`
--

LOCK TABLES `niveles_academicos` WRITE;
/*!40000 ALTER TABLE `niveles_academicos` DISABLE KEYS */;
INSERT INTO `niveles_academicos` VALUES (1,'Preprimaria'),(2,'Primaria'),(3,'Basicos'),(4,'Bachillerato');
/*!40000 ALTER TABLE `niveles_academicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `observaciones`
--

DROP TABLE IF EXISTS `observaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `observaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `observaciones`
--

LOCK TABLES `observaciones` WRITE;
/*!40000 ALTER TABLE `observaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `observaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uniforme`
--

DROP TABLE IF EXISTS `uniforme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uniforme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenda` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uniforme`
--

LOCK TABLES `uniforme` WRITE;
/*!40000 ALTER TABLE `uniforme` DISABLE KEYS */;
INSERT INTO `uniforme` VALUES (1,'polo'),(2,'pantalon'),(3,'chumpa'),(4,'zapatos de vestir'),(5,'playera'),(6,'pants'),(7,'tenis'),(8,'corte de pelo');
/*!40000 ALTER TABLE `uniforme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `rol` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'fuentes@cole.general.gt','rm2025','Josuee','Fuentes',NULL),(2,'florcordi@cole.general.gt','flor2025','Flor','Córdoba',NULL),(3,'administrador@general.gt','adm12345','Admin','General',NULL),(4,'carlos@cole.general.gt','m1clave','Carlos','Pérez',NULL),(5,'ana@cole.general.gt','m2clave','Ana','González',NULL),(6,'luis@cole.general.gt','m3clave','Luis','Ramírez',NULL),(7,'maría@cole.general.gt','m4clave','María','Soto',NULL),(8,'jorge@cole.general.gt','m5clave','Jorge','López',NULL),(9,'elena@cole.general.gt','m6clave','Elena','Castillo',NULL),(10,'pedro@cole.general.gt','m7clave','Pedro','Martínez',NULL),(11,'sofía@cole.general.gt','m8clave','Sofía','Guzmán',NULL),(12,'andrés@cole.general.gt','m9clave','Andrés','Rodríguez',NULL),(13,'lucía@cole.general.gt','m10clave','Lucía','Ruiz',NULL),(14,'miguel@cole.general.gt','m11clave','Miguel','Ortega',NULL),(15,'valeria@cole.general.gt','m12clave','Valeria','Vargas',NULL),(16,'ricardo@cole.general.gt','m13clave','Ricardo','Morales',NULL),(17,'camila@cole.general.gt','m14clave','Camila','Reyes',NULL),(18,'fernando@cole.general.gt','m15clave','Fernando','Flores',NULL),(19,'daniela@cole.general.gt','m16clave','Daniela','Cruz',NULL),(20,'álvaro@cole.general.gt','m17clave','Álvaro','Hernández',NULL),(21,'gabriela@cole.general.gt','m18clave','Gabriela','Romero',NULL),(22,'iván@cole.general.gt','m19clave','Iván','Silva',NULL),(23,'paola@cole.general.gt','m20clave','Paola','Mendoza',NULL),(24,'javier@cole.general.gt','m21clave','Javier','Torres',NULL),(25,'maestroprueba@cole.general.gt','cole12','Jose Lopez','',NULL),(26,'prueba1@cole.general.gt','pruebs1','Prueba1','',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-08 20:32:52
