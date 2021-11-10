// CONTRIBUTOR: Robin Chong

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../../server');
const assert = require('assert');

const dummy = require("../../app/dummy/reload")

chai.use(chaiHttp);

describe('Quiz API - POST /api/quiz/getQuizPackage', () => { //POST: getQuizPackage
    before(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid learner = Is a learner for the class which the quiz is in (SESSION_LEARNER_ALT_3)
    // - Valid trainer = Is a trainer for the class which the quiz is in (SESSION_TRAINER_ALT_3)
    
    //Valid POST - | By quizId | Valid learner, Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_LEARNER_ALT_3, dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST | By quizId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
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
    //Valid POST - | By courseId | Valid learner, Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_LEARNER_ALT_3, dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST | By courseId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "courseId": 1,
                "session": ses
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
    //Valid POST - | By sectionId | Valid learner, Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_LEARNER_ALT_3, dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST | By sectionId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "sectionId": 1,
                "session": ses
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

    //=================== INVALID ===================
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/getQuizPackage`, (done) => {
        chai.request(app).post("/api/quiz/getQuizPackage").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST - Invalid user & Invalid session /api/quiz/getQuizPackage ${i}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/getQuizPackage").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 401);
                done();
            })
        })
    })

    // - Invalid learner (i.e. random learner) = Is NOT a learner for the class which the quiz is in (SESSION_LEARNER_ALT_2)
    // - Invalid trainer (i.e. random learner) = Is NOT a trainer for the class which the quiz is in (SESSION_TRAINER_ALT_1)
    
    //Invalid POST - | By quizId | Invalid learner, Invalid trainer
    sessL = [dummy.SESSION_LEARNER_ALT_2, dummy.SESSION_TRAINER_ALT_1]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST | By quizId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/getQuizPackage").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 400);
                done();
            })
        })
    })
    //Invalid POST - | By quizId | Invalid learner, Invalid trainer
    sessL = [dummy.SESSION_LEARNER_ALT_2, dummy.SESSION_TRAINER_ALT_1]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST | By courseId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "courseId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/getQuizPackage").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 400);
                done();
            })
        })
    })
    //Invalid POST - | By quizId | Invalid learner, Invalid trainer
    sessL = [dummy.SESSION_LEARNER_ALT_2, dummy.SESSION_TRAINER_ALT_1]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST | By sectionId /api/quiz/getQuizPackage ${i}-${ses.username}`, (done) => {
            const data = {
                "sectionId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/getQuizPackage").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 400);
                done();
            })
        })
    })

})

describe('Quiz API - POST /api/quiz/createQuiz', () => { //POST: createQuiz
    before(function(done){
        dummy.reload().then(() => { done() })
    })
    //=================== VALID ===================
    // - Valid trainer = Is a trainer for the class which the quiz is in (SESSION_TRAINER_ALT_3)
    
    //Valid POST - | Graded Quiz | Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST Graded /api/quiz/createQuiz ${i}`, (done) => {
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
                "sectionId": null,
                "session": ses
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

    //Valid POST - | Ungraded Quiz | Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST Ungraded /api/quiz/createQuiz ${i}`, (done) => {
            const data = {
                "quiz": {
                    "quizId": null,
                    "type": "UG",
                    "title": "TEST",
                    "instructions": null,
                    "durationInMins": 10,
                    "passScoreRequirement": null,
                    "active": false
                }, 
                "courseId": 1,
                "sectionId": 2,
                "session": ses
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
    
    //=================== INVALID ===================
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/createQuiz`, (done) => {
        chai.request(app).post("/api/quiz/createQuiz").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - | Graded | (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST Graded /api/quiz/createQuiz ${i}`, (done) => {
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
                "sectionId": null,
                "session": ses
            }
            chai.request(app).post("/api/quiz/createQuiz").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })

    //Invalid POST - | Ungraded | (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST Ungraded /api/quiz/createQuiz ${i}`, (done) => {
            const data = {
                "quiz": {
                    "quizId": null,
                    "type": "UG",
                    "title": "TEST",
                    "instructions": null,
                    "durationInMins": 10,
                    "passScoreRequirement": 0.7,
                    "active": false
                }, 
                "courseId": 1,
                "sectionId": 2,
                "session": ses
            }
            chai.request(app).post("/api/quiz/createQuiz").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })
    
    // - Invalid trainer = Is NOT a trainer for the class or course (SESSION_TRAINER_ALT_1)
    //Invalid POST - Incorrect trainer
    it(`Invalid POST /api/quiz/createQuiz`, (done) => {
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
            "sectionId": null,
            "session": dummy.SESSION_TRAINER_ALT_1
        }
        chai.request(app).post("/api/quiz/createQuiz").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})


describe('Quiz API - POST /api/quiz/updateQuiz', () => { //POST: updateQuiz
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid trainer = Is a trainer for the class which the quiz is in (SESSION_TRAINER_ALT_3)
    
    //Valid POST - | Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/updateQuiz ${i}`, (done) => {
            const data = {
                "quiz": {
                    "quizId": 1,
                    "type": "G",
                    "title": "TESTING",
                    "instructions": null,
                    "durationInMins": 20,
                    "passScoreRequirement": 0.8,
                    "active": true
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuiz").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 200);
                done();
            })
        })
    });
    
    //=================== INVALID ===================

    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/updateQuiz`, (done) => {
        chai.request(app).post("/api/quiz/updateQuiz").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL = [dummy.SESSION_LEARNER]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/updateQuiz ${i}`, (done) => {
            const data = {
                "quiz": {
                    "quizId": 1,
                    "type": "G",
                    "title": "TESTING",
                    "instructions": null,
                    "durationInMins": 20,
                    "passScoreRequirement": 0.8,
                    "active": true
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuiz").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    });

    // - Invalid trainer = Is NOT a trainer for the class or course (SESSION_TRAINER_ALT_1)
    //Invalid POST - Incorrect trainer
    it(`Invalid POST /api/quiz/updateQuiz`, (done) => {
        const data = {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TESTING",
                "instructions": null,
                "durationInMins": 20,
                "passScoreRequirement": 0.8,
                "active": true
            },
            "session": dummy.SESSION_TRAINER_ALT_1
        }
        chai.request(app).post("/api/quiz/updateQuiz").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})

describe('Quiz API - POST /api/quiz/addQuestion', () => { //POST: addQuestion
    before(function(done){
        dummy.reload().then(() => { done() })
    })

    //=================== VALID ===================
    // - Valid trainer = Is a trainer for the class which the quiz is in (SESSION_TRAINER_ALT_3)
    
    //Valid POST - | Valid trainer, ANY admin, ANY admin cum trainer
    sessL = [dummy.SESSION_TRAINER_ALT_3, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/addQuestion ${i}`, (done) => {
            const data = {
                "question": {
                    "questionId": null,
                    "question": "TEST",
                    "autoGraded": true,
                    "type": "MCQ"
                }, 
                "quizId": 1,
                "session": ses
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
    
    //=================== INVALID ===================

    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/addQuestion`, (done) => {
        chai.request(app).post("/api/quiz/addQuestion").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/addQuestion ${i}`, (done) => {
            const data = {
                "question": {
                    "questionId": null,
                    "question": "TEST",
                    "autoGraded": true,
                    "type": "MCQ"
                }, 
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/addQuestion").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })

    // - Invalid trainer = Is NOT a trainer for the class or course (SESSION_TRAINER_ALT_1)
    //Invalid POST - Incorrect trainer
    it(`Invalid POST /api/quiz/addQuestion`, (done) => {
        const data = {
            "question": {
                "questionId": null,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }, 
            "quizId": 1,
            "session": dummy.SESSION_TRAINER_ALT_1
        }
        chai.request(app).post("/api/quiz/addQuestion").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})


describe(`Quiz API - POST /api/quiz/updateQuestion`, () => { //POST: updateQuestion
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })

    //Valid POST
    sessL = [dummy.SESSION_TRAINER, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/updateQuestion ${i}`, (done) => {
            const data = {
                "question": {
                    "questionId": 1,
                    "question": "TEST",
                    "autoGraded": true,
                    "type": "MCQ"
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuestion").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 200);
                done();
            })
        })
    })

    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/updateQuestion`, (done) => {
        chai.request(app).post("/api/quiz/updateQuestion").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/updateQuestion ${i}`, (done) => {
            const data = {
                "question": {
                    "questionId": 1,
                    "question": "TEST",
                    "autoGraded": true,
                    "type": "MCQ"
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuestion").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })

    //TODO: Invalid POST - Incorrect trainer
});


describe(`Quiz API - POST /api/quiz/deleteQuestion`, () => { //POST: deleteQuestion
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })

    //Valid POST
    sessL = [dummy.SESSION_TRAINER, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/deleteQuestion ${i}`, (done) => {
            const data = {
                "questionId": 5,
                "session": ses
            }
            chai.request(app).post("/api/quiz/deleteQuestion").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 200);
                done();
            })
        })
    });
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/deleteQuestion`, (done) => {
        chai.request(app).post("/api/quiz/deleteQuestion").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/deleteQuestion ${i}`, (done) => {
            const data = {
                "questionId": 5,
                "session": ses
            }
            chai.request(app).post("/api/quiz/deleteQuestion").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    });

    //TODO: Invalid POST - Incorrect trainer
})


//QuestionOption
describe('Quiz API - POST /api/quiz/addQuestionOption', () => { //POST: addQuestionOption
    before(function(done){
        dummy.reload().then(() => { done() })
    })

    //Valid POST
    sessL = [dummy.SESSION_TRAINER, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/addQuestionOption ${i}`, (done) => {
            const data = {
                "questionOption": {
                    "questionOptionId": null,
                    "optionText": "TEST",
                    "isCorrect": true
                },
                "questionId": 1,
                "session": ses
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
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/addQuestionOption`, (done) => {
        chai.request(app).post("/api/quiz/addQuestionOption").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/addQuestionOption ${i}`, (done) => {
            const data = {
                "questionOption": {
                    "questionOptionId": null,
                    "optionText": "TEST",
                    "isCorrect": true
                },
                "questionId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quiz/addQuestionOption").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })

    //TODO: Invalid POST - Incorrect trainer
})


describe(`Quiz API - POST /api/quiz/updateQuestionOption`, () => { //POST: updateQuestionOption
    beforeEach(function(done){
        dummy.reload().then(() => { done(); })
    });

    //Valid POST
    sessL = [dummy.SESSION_TRAINER, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/updateQuestionOption ${i}`, (done) => {
            const data = {
                "questionOption": {
                    "questionOptionId": 1,
                    "optionText": "TESTING",
                    "isCorrect": false
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuestionOption").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 200);
                done();
            })
        })
    })
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/updateQuestionOption`, (done) => {
        chai.request(app).post("/api/quiz/updateQuestionOption").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Invalid POST /api/quiz/updateQuestionOption ${i}`, (done) => {
            const data = {
                "questionOption": {
                    "questionOptionId": 1,
                    "optionText": "TESTING",
                    "isCorrect": false
                },
                "session": ses
            }
            chai.request(app).post("/api/quiz/updateQuestionOption").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    })

    //TODO: Invalid POST - Incorrect trainer
})

describe('Quiz API - POST /api/quiz/deleteQuestionOption', () => { //POST: deleteQuestionOption
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //Valid POST
    sessL = [dummy.SESSION_TRAINER, dummy.SESSION_ADMIN, dummy.SESSION_ADMIN_TRAINER]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/deleteQuestionOption ${i}`, (done) => {
            const data = {
                "questionOptionId": 17,
                "session": ses
            }
            chai.request(app).post("/api/quiz/deleteQuestionOption").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                assert(response.status == 200);
                done();
            })
        })
    });
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quiz/deleteQuestionOption`, (done) => {
        chai.request(app).post("/api/quiz/deleteQuestionOption").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - (LEARNER) has insufficient perms, Invalid user & Invalid session
    sessL = [dummy.SESSION_LEARNER, dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quiz/deleteQuestionOption ${i}`, (done) => {
            const data = {
                "questionOptionId": 17,
                "session": ses
            }
            chai.request(app).post("/api/quiz/deleteQuestionOption").send(data)
            .end((err, response) => {
                console.log("Status:" + response.status);
                if(ses == dummy.SESSION_LEARNER){
                    assert(response.status == 403);
                }else{
                    assert(response.status == 401);
                }
                done();
            })
        })
    });

    //TODO: Invalid POST - Incorrect trainer
})