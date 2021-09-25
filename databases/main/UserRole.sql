CREATE TABLE `UserRole` (
  `userRoleId` int NOT NULL AUTO_INCREMENT,
  `roleType` varchar(5) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`userRoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci