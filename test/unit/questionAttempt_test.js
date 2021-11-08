// CONTRIBUTOR: Robin Chong

const assert = require('assert')
const { QuestionAttempt } = require("../../app/models")

describe('QuestionAttempt creation', () => { //CREATE
    before(function(){
        isCorrect = true;
        quizAttemptId = 1;
        questionOptionId = 1;
    });

    it('Create valid QuestionAttempt', () => {
        const result = QuestionAttempt.createQuestionAttempt(isCorrect, quizAttemptId, questionOptionId);
        assert(result != null);
    });

    it('Create invalid QuestionAttempt', () => {
        for(let i = 0; i < 6; i++){
            let ic = isCorrect
            let qId = quizAttemptId
            let eId = questionOptionId

            if(i == 0){ ic = null}
            else if(i == 1){ ic = "R"}
            else if(i == 2){ qId = null}
            else if(i == 3){ qId = "O"}
            else if (i == 4){ eId = null }
            else if (i == 5){ eId = "B" }

            const result = QuestionAttempt.createQuestionAttempt(ic, qId, eId);
            if(result != null){
                console.log("QuestionAttempt FAILED: " + i);
            }
            assert(result == null);
        }
    });
});