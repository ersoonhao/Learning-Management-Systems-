// DONE BY: Robin Chong

const assert = require('assert')
const { Quiz } = require("../../app/models");

//GRADED Quiz
describe('GRADED Quiz creation', () => { //CREATE
    before(function(){
        courseId = 1;
        sectionId = null;

        quiz = {
            quizId: null,
            type: Quiz.QUIZ_TYPES_GRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            passScoreRequirement: 0.7,
            active: false
        }
    });

    it('Create valid GRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            const q = Object.assign({}, quiz);

            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.createQuiz(q, courseId, sectionId);
            assert(result != null);
        }
    });

    it('Create invalid GRADED quiz', () => {
        for(let i = 0; i < 8; i++){
            let q = Object.assign({}, quiz);
            let cId = courseId;
            let sId = sectionId;

            if(i == 0){ q.type = null}
            else if (i == 1){ q.title = null }
            else if (i == 2){ q.durationInMins = null }
            else if (i == 3){ cId = null }
            else if (i == 4){ sId = 1 }
            else if (i == 5){ q.passScoreRequirement = null }
            else if (i == 6){ q.passScoreRequirement = -1 }
            else if (i == 7){ q.passScoreRequirement = 2 }

            const result = Quiz.createQuiz(q, cId, sId);
            if(result != null){
                console.log("FAILED: " + i);
            }
            assert(result == null);
        }
    });
});
describe('GRADED Quiz update', () => { //UPDATE
    before(function(){
        quiz = {
            quizId: 1,
            type: Quiz.QUIZ_TYPES_GRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            passScoreRequirement: 0.7,
            active: false
        }
    });

    it('Update valid GRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            let q = Object.assign({}, quiz);

            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.updateQuiz(q);
            assert(result != null);
        }
    });

    it('Update invalid GRADED quiz', () => {
        for(let i = 0; i < 7; i++){
            let q = Object.assign({}, quiz);

            if(i == 0){ q.quizId = null}
            else if(i == 1){ q.type = null}
            else if (i == 2){ q.title = null }
            else if (i == 3){ q.durationInMins = null }
            else if (i == 4){ q.passScoreRequirement = null }
            else if (i == 5){ q.passScoreRequirement = -1 }
            else if (i == 6){ q.passScoreRequirement = 2 }

            const result = Quiz.updateQuiz(q);
            assert(result == null);
        }
    });
});



//=== UNGRADED quiz
describe('UNGRADED Quiz creation', () => { //CREATE
    before(function(){
        courseId = 1
        sectionId = 1
        quiz = {
            type: Quiz.QUIZ_TYPES_UNGRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            passScoreRequirement: null,
            active: false
        }
    });
    
    it('Create valid UNGRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            let q = Object.assign({}, quiz);
            
            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.createQuiz(q, courseId, sectionId);
            assert(result != null);
        }
    });
    
    it('Create invalid UNGRADED quiz', () => {
        for(let i = 0; i < 6; i++){
            let q = Object.assign({}, quiz);
            let cId = courseId;
            let sId = sectionId;

            if(i == 0){ q.type = null}
            else if (i == 1){ q.title = null }
            else if (i == 2){ q.durationInMins = null }
            else if (i == 3){ cId = null }
            else if (i == 4){ sId = null }
            else if (i == 5){ q.passScoreRequirement = 1 }

            const result = Quiz.createQuiz(q, cId, sId);
            if(result != null){
                console.log("FAILED: " + i);
            }
            assert(result == null);
        }
    });
});

describe('UNGRADED Quiz update', () => { //UPDATE
    before(function(){
        quiz = {
            quizId: 1,
            type: Quiz.QUIZ_TYPES_UNGRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            passScoreRequirement: null,
            active: false
        }
    });
    
    it('Update valid UNGRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            let q = Object.assign({}, quiz);
            
            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.updateQuiz(q);
            assert(result != null);
        }
    });
    
    it('Update invalid UNGRADED quiz', () => {
        for(let i = 0; i < 5; i++){
            let q = Object.assign({}, quiz);

            if(i == 0){ q.quizId = null}
            else if(i == 1){ q.type = null}
            else if (i == 2){ q.title = null }
            else if (i == 3){ q.durationInMins = null }
            else if (i == 4){ q.passScoreRequirement = 1 }

            const result = Quiz.updateQuiz(q);
            if(result != null){
                console.log("FAILED: " + i);
            }
            assert(result == null);
        }
    });
});