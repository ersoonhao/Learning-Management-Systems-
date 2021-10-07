// CONTRIBUTOR: Robin Chong

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../../server');
const assert = require('assert');

const dummy_reload = require("../../app/dummy/reload")

chai.use(chaiHttp);

describe('Quiz API - POST /api/quiz/getQuizPackage', () => { //POST: getQuizPackage
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
    it("Valid POST /api/quiz/getQuizPackage", (done) => {
        const data = {
            "quizId": 1
        }
        chai.request(app).post("/api/quiz/getQuizPackage").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            assert('quiz' in response.body);
            done();
        })
    })
})

describe('Quiz API - POST /api/quiz/createQuiz', () => { //POST: createQuiz
    before(function(done){
        dummy_reload.reload().then(() => { done() })
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
})
describe('Quiz API - POST /api/quiz/updateQuiz', () => { //POST: updateQuiz
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
    it("Valid POST /api/quiz/updateQuiz", (done) => {
        const data = {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TESTING",
                "instructions": null,
                "durationInMins": 20,
                "passScoreRequirement": 0.8,
                "active": true
            }
        }
        chai.request(app).post("/api/quiz/updateQuiz").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            done();
        })
    })
})

describe('Quiz API - POST /api/quiz/addQuestion', () => { //POST: addQuestion
    before(function(done){
        dummy_reload.reload().then(() => { done() })
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
})
describe('Quiz API - POST /api/quiz/updateQuestion', () => { //POST: updateQuestion
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
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
})
describe('Quiz API - POST /api/quiz/deleteQuestion', () => { //POST: deleteQuestion
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
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
})

//QuestionOption
describe('Quiz API - POST /api/quiz/addQuestionOption', () => { //POST: addQuestionOption
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
    it("Valid POST /api/quiz/addQuestionOption", (done) => {
        const data = {
            "questionOption": {
                "questionOptionId": null,
                "optionText": "TEST",
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
})

describe('Quiz API - POST /api/quiz/updateQuestionOption', () => { //POST: updateQuestionOption
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    });
    it("Valid POST /api/quiz/updateQuestionOption", (done) => {
        const data = {
            "questionOption": {
                "questionOptionId": 1,
                "optionText": "TESTING",
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
})
describe('Quiz API - POST /api/quiz/deleteQuestionOption', () => { //POST: deleteQuestionOption
    before(function(done){
        dummy_reload.reload().then(() => { done() })
    })
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
})