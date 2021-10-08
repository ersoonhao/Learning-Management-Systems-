CREATE TABLE `Class` (
  `classId` int NOT NULL AUTO_INCREMENT,
  `classStartDateTime` datetime NOT NULL,
  -- to be entered by HR
  `classEndDateTime` datetime NOT NULL,
  -- to be entered by HR
  `selfEnrollStartDateTime` datetime NOT NULL,
  -- to be entered by HR
  `selfEnrollEndDateTime` datetime NOT NULL,
  -- to be entered by HR
  `maxCapacity` int NOT NULL,
  -- to be entered by HR
  `courseId` int NOT NULL,
  
  `trnAccountId` int NOT NULL,
  -- trainer ID so need create dummy data for trainers 
  `adminAccountId` int NOT NULL,
  -- HR ID so need create dummy data for admins 
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- create a model from this