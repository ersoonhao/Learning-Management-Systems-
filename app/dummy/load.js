const db = require("../models");

module.exports.SESSION_ADMIN_TRAINER = { username: "robin", sessionId: "0q8l8" }
module.exports.SESSION_ADMIN = { username: "soonhao", sessionId: "gee43" }
module.exports.SESSION_TRAINER = { username: "john", sessionId: "daoi0" }
module.exports.SESSION_TRAINER_ALT_1 = { username: "varun", sessionId: "dsaw2" }
module.exports.SESSION_TRAINER_ALT_2 = { username: "joshua", sessionId: "eka31" }
module.exports.SESSION_TRAINER_ALT_3 = { username: "alvin", sessionId: "pr2o3" }
module.exports.SESSION_LEARNER = { username: "asher", sessionId: "dsa98" }
module.exports.SESSION_LEARNER_ALT_1 = { username: "bob", sessionId: "1cxm2" }
module.exports.SESSION_LEARNER_ALT_2 = { username: "sean", sessionId: "oei21" }
module.exports.SESSION_LEARNER_ALT_3 = { username: "george", sessionId: "csnm2" }

module.exports.SESSION_INVALID_USER = { username: "invalid", sessionId: "00000" }
module.exports.SESSION_INVALID_SESSION = { username: "robin", sessionId: "00000" }

module.exports.load = () => {
    return db.sequelize.query(`
        INSERT INTO Accounts(accountId, username, email, isAdmin, isTrainer, password, sessionId) VALUES
        (1, 'robin', 'robin.chong.2019@smu.edu.sg', 1, 1, 'a', '0q8l8'),
        (2, 'soonhao', 'robin.chong.2019@smu.edu.sg', 1, 0, 'a', 'gee43'),
        (3, 'john', 'robin.chong.2019@smu.edu.sg', 0, 1, 'a', 'daoi0'),
        (4, 'varun', 'robin.chong.2019@smu.edu.sg', 0, 1, 'a', 'dsaw2'),
        (5, 'joshua', 'robin.chong.2019@smu.edu.sg', 0, 1, 'a', 'eka31'),
        (6, 'alvin', 'robin.chong.2019@smu.edu.sg', 0, 1, 'a', 'pr2o3'),
        (7, 'asher', 'robin.chong.2019@smu.edu.sg', 0, 0, 'a', 'dsa98'),
        (8, 'bob', 'robin.chong.2019@smu.edu.sg', 0, 0, 'a', '1cxm2'),
        (9, 'sean', 'robin.chong.2019@smu.edu.sg', 0, 0, 'a', 'oei21'),
        (10, 'george', 'robin.chong.2019@smu.edu.sg', 0, 0, 'a', 'csnm2');

        INSERT INTO Courses(courseId, title, description, active) VALUES
        (1, 'Physics', 'This course is about Physics', true),
        (2, 'Biology', 'This course is about Biology', true),
        (3, 'Chemistry', 'This course is about Chemistry',  false),
        (4, 'Mathematics', 'This course is about Mathematics',  true);

        INSERT INTO Quizzes(quizId, type, title, instructions, durationInMins, passScoreRequirement, active, courseId, sectionId) VALUES
        (1, 'UG', "Section 1 Quiz", "Please complete the quiz within the time limit", 10, null, false, 1, 1),
        (2, 'G', "Final Quiz", "Please complete the quiz within the time limit", 10, 0.7, false, 1, 1),
        (3, 'UG', "Section 2 Quiz", "Please complete the quiz within the time limit", 10, null, false, 1, 2),
        (4, 'UG', "Section 2 Quiz", "Please complete the quiz within the time limit", 10, null, false, 1, 2);

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
        (7, "True", true, 3),
        (8, "False", false, 3),
        (9, "Repudiation", false, 4),
        (10, "Confidentiality", false, 4),
        (11, "Integrity", false, 4),
        (12, "Availability", true, 4),
        (13, "making new cats", false, 5),
        (14, "creating a catalogue", false, 5),
        (15, "encrypting a file", false, 5),
        (16, "reading a file", true, 5),
        (17, "True", true, 6),
        (18, "False", false, 6);
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
//     { quizId: 1, type: Quiz.QUIZ_TYPES_UNGRADED, title: "Section 1 Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: null, active: false, courseId: 1, sectionId: 1  },
//     { quizId: 2, type: Quiz.QUIZ_TYPES_GRADED, title: "Final Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: 0.7, active: false, courseId: 1, sectionId: 1 }
// ]
// let dummy_question = [
//     { questionId: 1, question: "In Linux terminal, the command 'cat' is for", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
//     { questionId: 2, question: "Compatibility usually comes at the cost of security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
//     { questionId: 3, question: "Security professional should always strive for absolute security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 },
//     { questionId: 4, question: "Security property provided by our identity card (e.g. SG IC)", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 }
// ]
// let dummy_questionOption = [
//     { questionOptionId: null, optionText: "making new cats", isCorrect: false, questionId: 1 },
//     { questionOptionId: null, optionText: "creating a catalogue", isCorrect: false, questionId: 1 },
//     { questionOptionId: null, optionText: "encrypting a file", isCorrect: false, questionId: 1 },
//     { questionOptionId: null, optionText: "reading a file", isCorrect: true, questionId: 1 },
//     { questionOptionId: null, optionText: "True", isCorrect: true, questionId: 2 },
//     { questionOptionId: null, optionText: "False", isCorrect: false, questionId: 2 },
//     { questionOptionId: null, optionText: "True", isCorrect: true, questionId: 3 },
//     { questionOptionId: null, optionText: "False", isCorrect: false, questionId: 3 },
//     { questionOptionId: null, optionText: "Repudiation", isCorrect: false, questionId: 4 },
//     { questionOptionId: null, optionText: "Confidentiality", isCorrect: false, questionId: 4 },
//     { questionOptionId: null, optionText: "Integrity", isCorrect: false, questionId: 4 },
//     { questionOptionId: null, optionText: "Availability", isCorrect: true, questionId: 4 }
// ]

// for(let q of dummy_quiz){ Quiz.create(q) }
// for(let q of dummy_question){ Question.create(q) }
// for(let q of dummy_questionOption){ QuestionOption.create(q) }