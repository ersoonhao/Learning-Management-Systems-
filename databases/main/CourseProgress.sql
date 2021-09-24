CREATE TABLE `CourseProgress` (
  `courseProgressId` int NOT NULL AUTO_INCREMENT,
  `progress` int DEFAULT NULL,
  `enrollmentId` int NOT NULL,
  `courseMaterialId` int NOT NULL,
  PRIMARY KEY (`courseProgressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci