CREATE TABLE `Question` (
  `questionId` int NOT NULL,
  `question` varchar(500) NOT NULL,
  `autoGraded` tinyint NOT NULL DEFAULT '1',
  `type` varchar(5) NOT NULL,
  `quizId` int NOT NULL,
  PRIMARY KEY (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci