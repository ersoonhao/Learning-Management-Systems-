// CONTRIBUTOR: Robin Chong

const assert = require('assert')
const { QuizAttempt } = require("../../app/models")

describe('QuizAttempt creation', () => { //CREATE
    before(function(){
        quizId = 1;
        enrollmentId = 1;
        
    });

    it('Create valid QuizAttempt', () => {
        const result = QuizAttempt.createQuizAttempt(quizId, enrollmentId);
        assert(result != null);
    });

    it('Create invalid QuizAttempt', () => {
        for(let i = 0; i < 2; i++){
            let qId = quizId
            let eId = enrollmentId

            if(i == 0){ qId = null}
            else if (i == 1){ eId = null }

            const result = QuizAttempt.createQuizAttempt(qId, eId);
            if(result != null){
                console.log("QuizAttempt FAILED: " + i);
            }
            assert(result == null);
        }
    });
});

describe('QuizAttempt update', () => { //UPDATE
    before(function(){
        quizAttempt = {
            quizAttemptId: 1,
            startDateAttempt: new Date().toISOString(),
            endDateAttempt: new Date().toISOString(),
            score: 90
        }
    });

    it('Update valid QuizAttempt', () => {
        const result = QuizAttempt.updateQuizAttempt(quizAttempt);
        assert(result != null);
    });

    it('Update invalid quizAttempt', () => {
        for(let i = 0; i < 2; i++){
            let q = Object.assign({}, quizAttempt);

            if(i == 0){ q.quizAttemptId = null}
            else if(i == 1){ 
                //startDateAttempt > endDateAttempt
                let d = new Date();
                d.setDate(d.getDate() - 1)
                q.endDateAttempt = d.toISOString()
            }

            const result = QuizAttempt.updateQuizAttempt(q);
            if(result != null){
                console.log("QuizAttempt FAILED: " + i);
            }
            assert(result == null);
        }
    });
});