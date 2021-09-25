CREATE TABLE `CourseMaterial` (
  `courseMaterialId` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `instructions` varchar(500) DEFAULT NULL,
  `source` varchar(500) NOT NULL,
  `type` varchar(10) NOT NULL,
  `sectionId` int NOT NULL,
  PRIMARY KEY (`courseMaterialId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci