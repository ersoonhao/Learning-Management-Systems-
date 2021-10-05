CREATE TABLE `QuizAttempt` (
  `quizAttemptId` int NOT NULL AUTO_INCREMENT,
  `startDateAttempt` datetime NOT NULL,
  `endDateAttempt` datetime NOT NULL,
  `score` int DEFAULT NULL,
  `enrollmentId` int NOT NULL,
  PRIMARY KEY (`quizAttemptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci