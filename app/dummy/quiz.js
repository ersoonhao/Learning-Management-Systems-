const db = require("../../app/models");
const Quiz = db.Quiz;
const Question = db.Question; 
const QuestionOption = db.QuestionOption;

console.log("Re-populating Quiz, Question, QuestionOption with dummy data");

let dummy_quiz = [
    { quizId: 1, type: Quiz.QUIZ_TYPES_UNGRADED, title: "Section 1 Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: null, active: false, courseId: 1, sectionId: 1  },
    { quizId: 2, type: Quiz.QUIZ_TYPES_GRADED, title: "Final Quiz", instructions: "Please complete the quiz within the time limit", durationInMins: 10, passScoreRequirement: 0.7, active: false, courseId: 1, sectionId: 1 }
]
let dummy_question = [
    { questionId: 1, question: "In Linux terminal, the command 'cat' is for", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
    { questionId: 2, question: "Compatibility usually comes at the cost of security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 1 },
    { questionId: 3, question: "Security professional should always strive for absolute security", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 },
    { questionId: 4, question: "Security property provided by our identity card (e.g. SG IC)", autoGraded: true, type: Question.QUESTION_TYPES_MCQ, quizId: 2 }
]
let dummy_questionOption = [
    { questionOptionId: null, option: "making new cats", isCorrect: false, questionId: 1 },
    { questionOptionId: null, option: "creating a catalogue", isCorrect: false, questionId: 1 },
    { questionOptionId: null, option: "encrypting a file", isCorrect: false, questionId: 1 },
    { questionOptionId: null, option: "reading a file", isCorrect: true, questionId: 1 },
    { questionOptionId: null, option: "True", isCorrect: true, questionId: 2 },
    { questionOptionId: null, option: "False", isCorrect: false, questionId: 2 },
    { questionOptionId: null, option: "True", isCorrect: true, questionId: 3 },
    { questionOptionId: null, option: "False", isCorrect: false, questionId: 3 },
    { questionOptionId: null, option: "Repudiation", isCorrect: false, questionId: 4 },
    { questionOptionId: null, option: "Confidentiality", isCorrect: false, questionId: 4 },
    { questionOptionId: null, option: "Integrity", isCorrect: false, questionId: 4 },
    { questionOptionId: null, option: "Availability", isCorrect: true, questionId: 4 }
]

for(let q of dummy_quiz){ Quiz.create(q) }
for(let q of dummy_question){ Question.create(q) }
for(let q of dummy_questionOption){ QuestionOption.create(q) }