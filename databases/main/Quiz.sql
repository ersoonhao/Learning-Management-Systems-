CREATE TABLE `Quiz` (
  `quizId` int NOT NULL,
  `type` varchar(2) NOT NULL,
  `title` varchar(100) NOT NULL,
  `instructions` varchar(500) DEFAULT NULL,
  `durationInMins` int NOT NULL,
  `courseId` int NOT NULL,
  `sectionId` int DEFAULT NULL,
  `passScoreRequirement` float DEFAULT NULL,
  `active` tinyint DEFAULT '0',
  PRIMARY KEY (`quizId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci