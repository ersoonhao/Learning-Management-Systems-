// CONTRIBUTOR: Robin Chong

const assert = require('assert')
const { QuestionOption } = require("../../app/models");

describe('QuestionOption creation', () => { //CREATE
    before(function(){
        questionId = 1;

        questionOption = {
            questionOptionId: null,
            option: "TEST",
            isCorrect: true
        }
    });

    it('Create valid QuestionOption', () => {
        const result = QuestionOption.createQuestionOption(questionOption, questionId);
        assert(result != null);
    });

    it('Create invalid QuestionOption', () => {
        for(let i = 0; i < 3; i++){
            let qo = Object.assign({}, questionOption);
            let qId = questionId;

            if (i == 0){ qo.option = null }
            else if (i == 1){ qo.isCorrect = null }
            else if (i == 2){ qId = null }

            const result = QuestionOption.createQuestionOption(qo, qId);
            if(result != null){
                console.log("QuestionOption FAILED: " + i);
            }
            assert(result == null);
        }
    });
});

describe('QuestionOption update', () => { //UPDATE
    before(function(){
        questionOption = {
            questionOptionId: 1,
            option: "TEST",
            isCorrect: true
        }
    });

    it('Update valid QuestionOption', () => {
        const result = QuestionOption.updateQuestionOption(questionOption);
        assert(result != null);
    });

    it('Update invalid QuestionOption', () => {
        for(let i = 0; i < 3; i++){
            let qo = Object.assign({}, questionOption);

            if (i == 0){ qo.questionOptionId = null }
            else if (i == 1){ qo.option = null }
            else if (i == 2){ qo.isCorrect = null }

            const result = QuestionOption.updateQuestionOption(qo);
            if(result != null){
                console.log("QuestionOption FAILED: " + i);
            }
            assert(result == null);
        }
    });
});