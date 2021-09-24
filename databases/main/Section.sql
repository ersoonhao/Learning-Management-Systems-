CREATE TABLE `Section` (
  `sectionId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `classId` int NOT NULL,
  PRIMARY KEY (`sectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci