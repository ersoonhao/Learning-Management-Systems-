CREATE TABLE `Enrollment` (
  `enrollmentId` int NOT NULL,
  `isSelfEnrolment` varchar(45) NOT NULL,
  `approvingHRId` tinyint DEFAULT NULL,
  `hrUserId` int NOT NULL,
  `dateCreated` datetime NOT NULL,
  `enrolledDate` datetime DEFAULT NULL,
  `coursePassed` tinyint DEFAULT NULL,
  `isWithdrawn` tinyint NOT NULL DEFAULT '0',
  `lnrUserRoleId` int NOT NULL,
  PRIMARY KEY (`enrollmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci