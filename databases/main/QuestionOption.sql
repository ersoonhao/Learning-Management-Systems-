CREATE TABLE `QuestionOption` (
  `questionOptionId` int NOT NULL AUTO_INCREMENT,
  `optionText` varchar(250) NOT NULL,
  `isCorrect` tinyint NOT NULL,
  `questionId` int DEFAULT NULL,
  PRIMARY KEY (`questionOptionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci