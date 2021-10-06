// CONTRIBUTOR: Robin Chong

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../../server');
const assert = require('assert');

const db = require("../../app/models");
const Quiz = db.Quiz;
const Question = db.Question;
const QuestionOption = db.QuestionOption;

chai.use(chaiHttp);

describe('Quiz API - POST /api/quiz/createQuiz', () => { //POST: createQuiz
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
    it("Valid POST /api/quiz/createQuiz", (done) => {
        const data = {
            "quiz": {
                "quizId": null,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 0.7,
                "active": false
            }, 
            "courseId": 1,
            "sectionId": null
        }
        chai.request(app).post("/api/quiz/createQuiz").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            assert('quiz' in response.body);
            done();
        })
    })
    before(async function(){
        await db.sequelize.sync({ force: true });
    })
})
describe('Quiz API - POST /api/quiz/updateQuiz', () => { //POST: updateQuiz
    before(async function(){
        await db.sequelize.sync({ force: true }).then(() => {
            let qList = [{
                quizId: 1,
                type: Quiz.QUIZ_TYPES_GRADED,
                title: "TEST",
                instructions: null,
                durationInMins: 10,
                passScoreRequirement: 0.7,
                active: false
            }];
            for(q of qList){ Quiz.create(q) }
        });
    })
    it("Valid POST /api/quiz/updateQuiz", (done) => {
        const data = {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 0.7,
                "active": false
            }
        }
        chai.request(app).post("/api/quiz/updateQuiz").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})

describe('Quiz API - POST /api/quiz/addQuestion', () => { //POST: addQuestion
    before(async function(){
        await db.sequelize.sync({ force: true });
    })
    it("Valid POST /api/quiz/addQuestion", (done) => {
        const data = {
            "question": {
                "questionId": null,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }, 
            "quizId": 1
        }
        chai.request(app).post("/api/quiz/addQuestion").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            assert('question' in response.body);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})
describe('Quiz API - POST /api/quiz/updateQuestion', () => { //POST: updateQuestion
    before(async function(){
        await db.sequelize.sync({ force: true }).then(() => {
            let qList = [{
                questionId: 1,
                question: "TEST",
                autoGraded: true,
                type: Question.QUESTION_TYPES_MCQ,
                quizId: 1
            }];
            for(q of qList){ Question.create(q) }
        });
    });
    it("Valid POST /api/quiz/updateQuestion", (done) => {
        const data = {
            "question": {
                "questionId": 1,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }
        }
        chai.request(app).post("/api/quiz/updateQuestion").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})
describe('Quiz API - POST /api/quiz/deleteQuestion', () => { //POST: deleteQuestion
    before(async function(){
        await db.sequelize.sync({ force: true }).then(() => {
            let qList = [{
                questionId: 1,
                question: "TEST",
                autoGraded: true,
                type: Question.QUESTION_TYPES_MCQ,
                quizId: 1
            }];
            for(q of qList){ Quiz.create(q) }
        });
    });
    it("Valid POST /api/quiz/deleteQuestion", (done) => {
        const data = {
            "questionId": 1
        }
        chai.request(app).post("/api/quiz/deleteQuestion").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})

//####

describe('Quiz API - POST /api/quiz/addQuestionOption', () => { //POST: addQuestionOption
    before(async function(){
        await db.sequelize.sync({ force: true });
    })
    it("Valid POST /api/quiz/addQuestionOption", (done) => {
        const data = {
            "questionOption": {
                "questionOptionId": null,
                "option": "TEST",
                "isCorrect": true
            },
            "questionId": 1
        }
        chai.request(app).post("/api/quiz/addQuestionOption").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            assert('questionOption' in response.body);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})
describe('Quiz API - POST /api/quiz/updateQuestionOption', () => { //POST: updateQuestionOption
    before(async function(){
        await db.sequelize.sync({ force: true }).then(() => {
            let qList = [{
                questionOptionId: 1,
                option: "TEST",
                isCorrect: true,
                questionId: 1
            }];
            for(q of qList){ QuestionOption.create(q) }
        });
    });
    it("Valid POST /api/quiz/updateQuestionOption", (done) => {
        const data = {
            "questionOption": {
                "questionOptionId": 1,
                "option": "TESTING",
                "isCorrect": false
            }
        }
        chai.request(app).post("/api/quiz/updateQuestionOption").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})
describe('Quiz API - POST /api/quiz/deleteQuestionOption', () => { //POST: deleteQuestionOption
    before(async function(){
        await db.sequelize.sync({ force: true }).then(() => {
            let qList = [{
                questionOptionId: 1,
                option: "TEST",
                isCorrect: true,
                questionId: 1
            }];
            for(q of qList){ QuestionOption.create(q) }
        });
    });
    it("Valid POST /api/quiz/deleteQuestionOption", (done) => {
        const data = {
            "questionOptionId": 1
        }
        chai.request(app).post("/api/quiz/deleteQuestionOption").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
    after(async function(){
        await db.sequelize.sync({ force: true });
    })
})