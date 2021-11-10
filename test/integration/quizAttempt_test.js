// CONTRIBUTOR: Robin Chong

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../../server');
const assert = require('assert');

const dummy = require("../../app/dummy/reload")

chai.use(chaiHttp);

describe('Quiz API - POST /api/quizAttempt/getMyQuizAttempts', () => { //POST: getMyQuizAttempts
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid learner = Is a learner for the class which the quiz is in (SESSION_LEARNER_ALT_3)
    
    //Valid POST - Valid learner
    it(`Valid POST /api/quizAttempt/getMyQuizAttempts`, (done) => {
        const data = {
            "quizId": 1,
            "session": dummy.SESSION_LEARNER_ALT_3
        }
        chai.request(app).post("/api/quizAttempt/getMyQuizAttempts").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert('quizAttempts' in response.body);
            assert(response.status == 200);
            done();
        })
    })
    
    //=================== INVALID ===================
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quizAttempt/getMyQuizAttempts`, (done) => {
        chai.request(app).post("/api/quizAttempt/getMyQuizAttempts").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quizAttempt/getMyQuizAttempts ${i}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quizAttempt/getMyQuizAttempts").send(data)
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

    // - Invalid learner (i.e. random learner) = Is NOT a learner for the class which the quiz is in (SESSION_LEARNER_ALT_2)
    
    //Invalid POST - Invalid learner
    it(`Valid POST /api/quizAttempt/getMyQuizAttempts`, (done) => {
        const data = {
            "quizId": 1,
            "session": dummy.SESSION_LEARNER_ALT_2
        }
        chai.request(app).post("/api/quizAttempt/getMyQuizAttempts").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})

describe('Quiz API - POST /api/quizAttempt/getMyQuestionAttempts', () => { //POST: getMyQuestionAttempts
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    //Valid POST - Valid learner
    it(`Valid POST /api/quizAttempt/getMyQuestionAttempts`, (done) => {
        const data = {
            "quizAttemptId": 1,
            "session": dummy.SESSION_LEARNER_ALT_3
        }
        chai.request(app).post("/api/quizAttempt/getMyQuestionAttempts").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 200);
            assert('questionAttempts' in response.body);
            done();
        })
    })

    //=================== INVALID ===================
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quizAttempt/getMyQuestionAttempts`, (done) => {
        chai.request(app).post("/api/quizAttempt/getMyQuestionAttempts").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quizAttempt/getMyQuestionAttempts ${i}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quizAttempt/getMyQuestionAttempts").send(data)
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
})

describe('Quiz API - POST /api/quizAttempt/startQuizAttempt', () => { //POST: startQuizAttempt
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid learner = Is a learner for the class which the quiz is in (SESSION_LEARNER_ALT_3)
    
    //Valid POST - Valid learner
    it(`Valid POST /api/quizAttempt/startQuizAttempt`, (done) => {
        const data = {
            "quizId": 1,
            "session": dummy.SESSION_LEARNER_ALT_3
        }
        chai.request(app).post("/api/quizAttempt/startQuizAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert('quizAttempt' in response.body);
            assert(response.status == 200);
            done();
        })
    })
    
    //=================== INVALID ===================
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quizAttempt/startQuizAttempt`, (done) => {
        chai.request(app).post("/api/quizAttempt/startQuizAttempt").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quizAttempt/startQuizAttempt ${i}`, (done) => {
            const data = {
                "quizId": 1,
                "session": ses
            }
            chai.request(app).post("/api/quizAttempt/startQuizAttempt").send(data)
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

    // - Invalid learner (i.e. random learner) = Is NOT a learner for the class which the quiz is in (SESSION_LEARNER_ALT_2)
    
    //Invalid POST - Invalid learner
    it(`Valid POST /api/quizAttempt/startQuizAttempt`, (done) => {
        const data = {
            "quizId": 1,
            "session": dummy.SESSION_LEARNER_ALT_2
        }
        chai.request(app).post("/api/quizAttempt/startQuizAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})

describe('Quiz API - POST /api/quizAttempt/registerQuestionAttempt', () => { //POST: registerQuestionAttempt
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid learner = Is a the leaner of the question attempt (SESSION_LEARNER_ALT_3)
    
    //Valid POST - Valid learner
    it(`Valid POST /api/quizAttempt/registerQuestionAttempt`, (done) => {
        const data = {
            "quizAttemptId": 2, 
            "questionOptionId": 4,
            "session": dummy.SESSION_LEARNER_ALT_3
        }
        chai.request(app).post("/api/quizAttempt/registerQuestionAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert('questionAttempt' in response.body);
            assert(response.status == 200);
            done();
        })
    })
    
    //=================== INVALID ===================
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quizAttempt/registerQuestionAttempt`, (done) => {
        chai.request(app).post("/api/quizAttempt/registerQuestionAttempt").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quizAttempt/registerQuestionAttempt ${i}`, (done) => {
            const data = {
                "quizAttemptId": 2, 
                "questionOptionId": 4,
                "session": ses
            }
            chai.request(app).post("/api/quizAttempt/registerQuestionAttempt").send(data)
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

    // - Invalid learner (i.e. random learner) = Is NOT the learner of the question attempt (SESSION_LEARNER_ALT_2)
    
    //Invalid POST - Invalid learner
    it(`Valid POST /api/quizAttempt/registerQuestionAttempt`, (done) => {
        const data = {
            "quizAttemptId": 2, 
            "questionOptionId": 4,
            "session": dummy.SESSION_LEARNER_ALT_2
        }
        chai.request(app).post("/api/quizAttempt/registerQuestionAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})

describe('Quiz API - POST /api/quizAttempt/submitQuizAttempt', () => { //POST: submitQuizAttempt
    beforeEach(function(done){
        dummy.reload().then(() => { done() })
    })
    
    //=================== VALID ===================
    // - Valid learner = Is a the leaner of the question attempt (SESSION_LEARNER_ALT_3)
    
    //Valid POST - Valid learner
    it(`Valid POST /api/quizAttempt/submitQuizAttempt`, (done) => {
        const data = {
            "quizAttemptId": 2, 
            "session": dummy.SESSION_LEARNER_ALT_3
        }
        chai.request(app).post("/api/quizAttempt/submitQuizAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert('quizAttempt' in response.body);
            assert(response.status == 200);
            done();
        })
    })
    
    //=================== INVALID ===================
    
    //Invalid POST - Incorrect param format
    it(`Invalid POST - Incorrect param format /api/quizAttempt/submitQuizAttempt`, (done) => {
        chai.request(app).post("/api/quizAttempt/submitQuizAttempt").send()
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })

    //Invalid POST - Invalid user & Invalid session
    sessL = [dummy.SESSION_INVALID_USER, dummy.SESSION_INVALID_SESSION]
    sessL.forEach(function (ses, i) {
        it(`Valid POST /api/quizAttempt/submitQuizAttempt ${i}`, (done) => {
            const data = {
                "quizAttemptId": 2, 
                "session": ses
            }
            chai.request(app).post("/api/quizAttempt/submitQuizAttempt").send(data)
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

    // - Invalid learner (i.e. random learner) = Is NOT the learner of the question attempt (SESSION_LEARNER_ALT_2)
    
    //Invalid POST - Invalid learner
    it(`Valid POST /api/quizAttempt/submitQuizAttempt`, (done) => {
        const data = {
            "quizAttemptId": 2, 
            "session": dummy.SESSION_LEARNER_ALT_2
        }
        chai.request(app).post("/api/quizAttempt/submitQuizAttempt").send(data)
        .end((err, response) => {
            console.log("Status:" + response.status);
            assert(response.status == 400);
            done();
        })
    })
})

