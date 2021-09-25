CREATE TABLE `QuestionAttempt` (
  `questionAttemptId` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `questionOptionId` int NOT NULL,
  PRIMARY KEY (`questionAttemptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci