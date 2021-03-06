const db = require("../models");

module.exports.SESSION_ADMIN_TRAINER = { username: "robin", sessionId: "0q8l8" }
module.exports.SESSION_ADMIN = { username: "soonhao", sessionId: "gee43" }
module.exports.SESSION_TRAINER = { username: "john", sessionId: "daoi0" }
module.exports.SESSION_TRAINER_ALT_1 = { username: "varun", sessionId: "dsaw2" }
module.exports.SESSION_TRAINER_ALT_2 = { username: "joshua", sessionId: "eka31" }
module.exports.SESSION_TRAINER_ALT_3 = { username: "nicholas", sessionId: "pr2o3" }
module.exports.SESSION_LEARNER = { username: "asher", sessionId: "dsa98" }
module.exports.SESSION_LEARNER_ALT_1 = { username: "bob", sessionId: "1cxm2" }
module.exports.SESSION_LEARNER_ALT_2 = { username: "sean", sessionId: "oei21" }
module.exports.SESSION_LEARNER_ALT_3 = { username: "george", sessionId: "csnm2" }

module.exports.SESSION_INVALID_USER = { username: "invalid", sessionId: "00000" }
module.exports.SESSION_INVALID_SESSION = { username: "robin", sessionId: "00000" }

module.exports.load = () => {
    return db.sequelize.query(`
        INSERT INTO Accounts(accountId, username, email, isAdmin, isTrainer, password, sessionId) VALUES
        (1, 'robin', 'wafturerobin@gmail.com', 1, 1, 'a', '0q8l8'),
        (2, 'soonhao', 'soonhao.er.2019@smu.edu.sg', 1, 0, 'a', 'gee43'),
        (3, 'john', 'john.d.cheong@gmail.com', 0, 1, 'a', 'daoi0'),
        (4, 'varun', 'balamuniap.2019@smu.edu.sg', 0, 1, 'a', 'dsaw2'),
        (5, 'joshua', 'john.d.cheong@gmail.com', 0, 1, 'a', 'eka31'),
        (6, 'nicholas', 'nicholastch@smu.edu.sg', 0, 1, 'a', 'pr2o3'),
        (7, 'asher', 'asherleong.2019@scis.smu.edu.sg', 0, 0, 'a', 'dsa98'),
        (8, 'bob', 'wafturerobin@gmail.com', 0, 0, 'a', '1cxm2'),
        (9, 'sean', 'wafturerobin@gmail.com', 0, 0, 'a', 'oei21'),
        (10, 'george', 'asherleong.2019@scis.smu.edu.sg', 0, 0, 'a', 'csnm2');

        INSERT INTO Courses(courseId, title, description, active, courseImage) VALUES
        (1, 'Cyber Security', 'This course is about cyber security', true, 'https://i.picsum.photos/id/236/800/800.jpg?hmac=-m1crl44KO9L8Rs4QGYJq6nuXo0R6V-Zc3v48BUc8WE'),
        (2, 'Biology', 'This course is about Biology', true, 'https://i.picsum.photos/id/427/800/800.jpg?hmac=C9qE9ogOx2qI05D2zGZ362KkduRWpt7xDT4DXcfcSDk'),
        (3, 'Chemistry', 'This course is about Chemistry', false,  'https://i.picsum.photos/id/66/800/800.jpg?hmac=QwjZxiyFrWQI9G4d8F44wFqjxZ66zIPLlzeRRiiYrpk'),
        (4, 'Mathematics', 'This course is about Mathematics', false,'https://i.picsum.photos/id/882/800/800.jpg?hmac=No5hTPTge2_1GgssUGsE2qrhWTzL_mJRIhmQxKj6zUE'),
        (5, 'Econometrics', 'This course is about Econometrics', true,'https://i.picsum.photos/id/67/800/800.jpg?hmac=5EQTN86WBRMFbDXFqpQPIMgprmj49nXxKKReaPFR6NY'),
        (6, 'Software Project Management', 'This course is about Software Project Management', true,'https://i.picsum.photos/id/979/800/800.jpg?hmac=CcFLLmbee_yrrgnHxR1nmwrtA_khaZ1jd_XnPsKLNS0');

        INSERT INTO Classes(classId, selfEnrollStartDateTime, selfEnrollEndDateTime, classStartDateTime, classEndDateTime, maxCapacity, courseId, trnAccountId, adminAccountId) VALUES
        (1, '2021-07-01', '2021-08-30', '2021-09-01', '2022-01-01', 50, 1, 6, 1),
        (2, '2021-08-01', '2021-09-30', '2021-10-01', '2022-02-01', 50, 2, 6, 1),
        (3, '2021-09-01', '2021-10-30', '2021-11-01', '2022-03-01', 50, 3, 5, 1),
        (4, '2021-10-01', '2021-11-30', '2021-12-01', '2022-04-01', 50, 4, 5, 1),
        (5, '2021-10-01', '2021-11-30', '2021-12-01', '2022-04-01', 50, 4, 5, 1),
        (6, '2021-11-21', '2021-12-02', '2021-11-01', '2021-11-13', 50, 4, 3, 1),
        (7, '2021-11-3', '2021-11-30', '2021-11-02', '2021-11-13', 50, 5, 4, 1),
        (8, '2021-11-3', '2021-12-30', '2021-11-02', '2021-11-13', 50, 4, 4, 1),
        (9, '2021-07-01', '2021-08-30', '2021-09-01', '2022-01-01', 50, 6, 4, 1);

        INSERT INTO enrollments(enrollmentId, isSelfEnrollment, isEnrolled, dateCreated, enrolledDate, coursePassed, isWithdrawn, accountId, classId) VALUES
        (1, 1, 0, '2021-07-01', NULL, 0, 0, 7, 1),
        (2, 1, NULL, '2021-07-01', NULL, 0, 0, 8, 1),
        (3, 1, NULL, '2021-07-01', NULL, 0, 0, 9, 1),
        (4, 0, 1, '2021-07-01', NULL, 0, 0, 10, 1), 
        (5, 1, 0, '2021-07-01', NULL, 0, 0, 7, 2),
        (6, 1, NULL, '2021-07-01', NULL, 0, 0, 8, 2),
        (7, 1, NULL, '2021-07-01', NULL, 0, 0, 9, 2),
        (8, 0, 1, '2021-07-01', NULL, 0, 0, 10, 2),
        (9, 1, 0, '2021-07-01', NULL, 0, 0, 7, 3),
        (10, 1, NULL, '2021-07-01', NULL, 0, 0, 8, 3),
        (11, 1, NULL, '2021-07-01', NULL, 0, 0, 9, 3),
        (12, 0, 1, '2021-07-01', NULL, 0, 0, 10, 3),
        (13, 1, 0, '2021-07-01', NULL, 0, 0, 7, 4),
        (14, 1, NULL, '2021-07-01', NULL, 0, 0, 8, 4),
        (15, 1, NULL, '2021-07-01', NULL, 0, 0, 9, 4),
        (16, 0, 1, '2021-07-01', NULL, 0, 0, 10, 4),
        (17, 0, 1, '2021-07-01', NULL, 1, 0, 10, 9);
        
        INSERT INTO Sections(sectionId, title, subtitle, ordering, classId) VALUES
        (1,"Introduction" , "Computers", 1, 1),
        (2,"Security Basics" , "Confidentiality", 2, 1),
        (3,"Security Basics" , "Availability", 3, 1);

        INSERT INTO Quizzes(quizId, type, title, instructions, durationInMins, passScoreRequirement, active, courseId, sectionId) VALUES
        (1, 'UG', "Section 1 Quiz", "Please complete the quiz within the time limit", 10, NULL, true, NULL, 1),
        (2, 'G', "Final Quiz", "Please complete the quiz within the time limit", 10, 0.7, true, 1, NULL),
        (3, 'UG', "Section 2 Quiz", "Please complete the quiz within the time limit", 10, NULL, false, NULL, 2),
        (4, 'UG', "Section 2 Quiz", "Please complete the quiz within the time limit", 10, NULL, false, NULL, 2);

        INSERT INTO Questions(questionId, question, autoGraded, type, quizId) VALUES
        (1, "In Linux terminal, the command 'cat' is for", true, 'MCQ', 1),
        (2, "Compatibility usually comes at the cost of security", true, 'MCQ', 1),
        (3, "Security professional should always strive for absolute security", true, 'MCQ', 2),
        (4, "Security property provided by our identity card (e.g. SG IC)", true, 'MCQ', 2),
        (5, "In Linux terminal, the command 'cat' is for", true, 'MCQ', 3),
        (6, "Compatibility usually comes at the cost of security", true, 'MCQ', 4);
        
        INSERT INTO QuestionOptions(questionOptionId, optionText, isCorrect, questionId) VALUES
        (1, "making new cats", false, 1),
        (2, "creating a catalogue", false, 1),
        (3, "encrypting a file", false, 1),
        (4, "reading a file", true, 1),
        (5, "True", true, 2),
        (6, "False", false, 2),
        (7, "True", false, 3),
        (8, "False", true, 3),
        (9, "Repudiation", false, 4),
        (10, "Confidentiality", false, 4),
        (11, "Integrity", true, 4),
        (12, "Availability", false, 4),
        (13, "making new cats", false, 5),
        (14, "creating a catalogue", false, 5),
        (15, "encrypting a file", false, 5),
        (16, "reading a file", true, 5),
        (17, "True", true, 6),
        (18, "False", false, 6);

        INSERT INTO QuizAttempts(quizAttemptId, startDateAttempt, endDateAttempt, score, quizId, enrollmentId) VALUES
        (1, '2021-11-01', '2021-11-01', 2, 1, 4), /* enrollmentId=4, account=10 (george), quiz=1, section=1, class=1, course=1 */
        (2, '2021-11-07', NULL, NULL, 1, 4); /* enrollmentId=4, account=10 (george), quiz=1, section=1, class=1, course=1 */

        INSERT INTO QuestionAttempts(questionAttemptId, isCorrect, quizAttemptId, questionOptionId) VALUES
        (1, true, 1, 4), /* enrollmentId=4, account=10 (george), quiz=1, section=1, class=1, course=1 */
        (2, false, 1, 6),
        (3, NULL, 2, 3), /* enrollmentId=4, account=10 (george), quiz=1, section=1, class=1, course=1 */
        (4, NULL, 2, 5);

        INSERT INTO Messages(messageId, text, senderAccountId, receiverAccountId) VALUES
        (1, 'Hi SoonHao, Robin Here', 1, 2),
        (2, "Hi Robin, WHat's up, I am Soon Hao", 2, 1),
        (3, 'I love you Soon Hao', 1, 2),
        (4, 'Hehe me too', 2, 1),
        (5, 'Hi Varun, Robin Here', 1, 4),
        (6, "Hi Robin, WHat's up, I am Varun", 4, 1),
        (7, 'I love you Asher', 1, 7),
        (8, 'Hehe me too', 7, 1),
        (9, 'Hi Asher, Varun Here', 4, 7),
        (10, "Hi Varun, WHat's up, I am Asher", 7, 4),
        (11, 'I love you Asher', 4, 7),
        (12, 'Hehe me too', 7, 4);
        
        INSERT INTO CoursePrerequisites(setNumber, courseId) VALUES
        (1, 1),
        (2, 1),
        (2, 2);

     
        INSERT INTO PrerequisiteSets(setNumber, course_fk) VALUES
        (1, 2),
        (1, 4),
        (2, 1),
        (2, 3);
        
        INSERT INTO CourseMaterials(CourseMaterialId, title, instructions, source, type, sectionId, ordering) VALUES
        (1, 'Digitor Case Study', 'Read the labs before attempting the quiz', 'https://spm-files-upload.s3.ap-southeast-1.amazonaws.com/a4ba70a547a6d6e25ed16b9ef6820af4.pdf', 'pdf', 1, 1),
        (2, 'Symmetric Lab', 'Do the lab before the quiz', 'https://spm-files-upload.s3.ap-southeast-1.amazonaws.com/b2d3eef77d89f8b381c64864a2b81fb4.pdf', 'pdf', 2, 1),
        (3, 'Assymetric Lab', 'Do the lab before the quiz', 'https://spm-files-upload.s3.ap-southeast-1.amazonaws.com/1be32552caee7900652ae9931e3b4a63.pdf', 'pdf', 3, 1),
        (4, 'Digitor Case Study 2', 'Please read' , 'https://spm-files-upload.s3.ap-southeast-1.amazonaws.com/6e8c75d580f1407fcd50ba07b5744e96.docx', 'docx', 3, 3);




       
    `)
};

// //Course
// console.log("Populating Course with dummy data");
// const Course = db.Course;

// let dummy_course = [
//     {courseId: 1, title: 'Physics',description:'This course is about Physics', active:true},
//     {courseId: 2, title: 'Biology',description:'This course is about Biology', active:true},
//     {courseId: 3, title: 'Chemistry',description: 'This course is about Chemistry', active: false},
//     {courseId: 4, title: 'Mathematics',description: 'This course is about Mathematics', active: true}
// ]

// for(let course of dummy_course){ Course.create(course) }

// // Quiz, Question, QuestionOption
// console.log("Populating Quiz, Question, QuestionOption with dummy data");

// const Quiz = db.Quiz;
// const Question = db.Question; 
// const QuestionOption = db.QuestionOption;

// let dummy_quiz = [
//     { quizId: 1, type: Quiz.QUIZ_TYPES_UNGRADED, title: "Section 1 Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: NULL, active: false, courseId: 1, sectionId: 1  },
//     { quizId: 2, type: Quiz.QUIZ_TYPES_GRADED, title: "Final Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: 0.7, active: false, courseId: 1, sectionId: 1 }
// ]
// let dummy_question = [
//     { questionId: 1, question: "In Linux terminal, the command 'cat' is for", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
//     { questionId: 2, question: "Compatibility usually comes at the cost of security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
//     { questionId: 3, question: "Security professional should always strive for absolute security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 },
//     { questionId: 4, question: "Security property provided by our identity card (e.g. SG IC)", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 }
// ]
// let dummy_questionOption = [
//     { questionOptionId: NULL, optionText: "making new cats", isCorrect: false, questionId: 1 },
//     { questionOptionId: NULL, optionText: "creating a catalogue", isCorrect: false, questionId: 1 },
//     { questionOptionId: NULL, optionText: "encrypting a file", isCorrect: false, questionId: 1 },
//     { questionOptionId: NULL, optionText: "reading a file", isCorrect: true, questionId: 1 },
//     { questionOptionId: NULL, optionText: "True", isCorrect: true, questionId: 2 },
//     { questionOptionId: NULL, optionText: "False", isCorrect: false, questionId: 2 },
//     { questionOptionId: NULL, optionText: "True", isCorrect: true, questionId: 3 },
//     { questionOptionId: NULL, optionText: "False", isCorrect: false, questionId: 3 },
//     { questionOptionId: NULL, optionText: "Repudiation", isCorrect: false, questionId: 4 },
//     { questionOptionId: NULL, optionText: "Confidentiality", isCorrect: false, questionId: 4 },
//     { questionOptionId: NULL, optionText: "Integrity", isCorrect: false, questionId: 4 },
//     { questionOptionId: NULL, optionText: "Availability", isCorrect: true, questionId: 4 }
// ]

// for(let q of dummy_quiz){ Quiz.create(q) }
// for(let q of dummy_question){ Question.create(q) }
// for(let q of dummy_questionOption){ QuestionOption.create(q) }