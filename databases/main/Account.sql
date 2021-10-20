CREATE TABLE `Account` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `isAdmin` tinyint DEFAULT '0',
  `isTrainer` tinyint DEFAULT '0',
  `password` varchar(100) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `dateUpdated` datetime DEFAULT NULL,
  `sessionId` varchar(100) NULL, 
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci