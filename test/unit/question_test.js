// CONTRIBUTOR: Robin Chong

const assert = require('assert')
const { Question } = require("../../app/models");

describe('Question creation', () => { //CREATE
    before(function(){
        quizId = 1;

        question = {
            questionId: null,
            question: "TEST",
            autoGraded: true,
            type: Question.QUESTION_TYPES_MCQ
        }
    });

    it('Create valid Question', () => {
        const result = Question.createQuestion(question, quizId);
        assert(result != null);
    });

    it('Create invalid Question', () => {
        for(let i = 0; i < 4; i++){
            let q = Object.assign({}, question);
            let qId = quizId;

            if(i == 0){ q.question = null}
            else if (i == 1){ q.autoGraded = null }
            else if (i == 2){ q.type = null }
            else if (i == 3){ qId = null }

            const result = Question.createQuestion(q, qId);
            if(result != null){
                console.log("Question FAILED: " + i);
            }
            assert(result == null);
        }
    });
});

describe('Question update', () => { //UPDATE
    before(function(){
        question = {
            questionId: 1,
            question: "TEST",
            autoGraded: true,
            type: Question.QUESTION_TYPES_MCQ
        }
    });

    it('Update valid Question', () => {
        const result = Question.updateQuestion(question);
        assert(result != null);
    });

    it('Update invalid question', () => {
        for(let i = 0; i < 4; i++){
            let q = Object.assign({}, question);

            if(i == 0){ q.questionId = null}
            else if(i == 1){ q.question = null}
            else if (i == 2){ q.autoGraded = null }
            else if (i == 3){ q.type = null }

            const result = Question.updateQuestion(q);
            if(result != null){
                console.log("Question FAILED: " + i);
            }
            assert(result == null);
        }
    });
});