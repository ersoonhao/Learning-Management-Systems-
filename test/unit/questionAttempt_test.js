// CONTRIBUTOR: Robin Chong

const assert = require('assert')
const { QuestionAttempt } = require("../../app/models")

describe('QuestionAttempt creation', () => { //CREATE
    before(function(){
        quizAttemptId = 1;
        questionOptionId = 1;
    });

    it('Create valid QuestionAttempt', () => {
        const result = QuestionAttempt.createQuestionAttempt(quizAttemptId, questionOptionId);
        assert(result != null);
    });

    it('Create invalid QuestionAttempt', () => {
        for(let i = 0; i < 4; i++){
            let qId = quizAttemptId
            let eId = questionOptionId

            if(i == 0){ qId = null}
            else if(i == 1){ qId = "O"}
            else if (i == 2){ eId = null }
            else if (i == 3){ eId = "B" }

            const result = QuestionAttempt.createQuestionAttempt(qId, eId);
            if(result != null){
                console.log("QuestionAttempt FAILED: " + i);
            }
            assert(result == null);
        }
    });
});

describe('Mark QuestionAttempt', () => { //CREATE
    before(function(){
        questionAttemptId = 1;
    });

    it('Mark QuestionAttempt valid', () => {
        let result = QuestionAttempt.markQuestion(questionAttemptId, false);
        assert(result != null);

        result = QuestionAttempt.markQuestion(questionAttemptId, true);
        assert(result != null);
    });
    
    it('Mark QuestionAttempt invalid', () => {
        for(let i = 0; i < 4; i++){
            let qaId = questionAttemptId
            let isCorrect = true

            if(i == 0){ qaId = null}
            else if(i == 1){ qaId = "O"}
            else if (i == 2){ isCorrect = null }
            else if (i == 3){ isCorrect = "B" }

            const result = QuestionAttempt.createQuestionAttempt(qaId, isCorrect);
            if(result != null){
                console.log("QuestionAttempt FAILED: " + i);
            }
            assert(result == null);
        }
    });
});