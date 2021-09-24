CREATE TABLE `Class` (
  `classId` int NOT NULL AUTO_INCREMENT,
  `classStartDateTime` datetime NOT NULL,
  `classEndDateTime` datetime NOT NULL,
  `selfEnrollStartDateTime` datetime NOT NULL,
  `selfEnrollEndDateTime` datetime NOT NULL,
  `maxCapacity` int NOT NULL,
  `trnAccountId` int NOT NULL,
  `adminAccountId` int NOT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci