const assert = require('assert')
const { Quiz } = require("../../app/models");

describe('GRADED Quiz creation', () => {
    before(function(){
        quiz = {
            type: Quiz.QUIZ_TYPES_GRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            courseId: 1,
            sectionId: null,
            passScoreRequirement: 3,
            active: false
        }
    });

    it('Create valid GRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            const q = Object.assign({}, quiz);

            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.createQuiz(q);
            assert(result != null);
        }
    });

    it('Create invalid GRADED quiz', () => {
        for(let i = 0; i < 6; i++){
            const q = Object.assign({}, quiz);

            if(i == 0){ q.type = null}
            else if (i == 1){ q.title = null }
            else if (i == 2){ q.durationInMins = null }
            else if (i == 3){ q.courseId = null }
            else if (i == 4){ q.sectionId = 1 }
            else if (i == 5){ q.passScoreRequirement = null }

            const result = Quiz.createQuiz(q);
            assert(result == null);
        }
    });
});
describe('UNGRADED Quiz creation', () => {
    before(function(){
        quiz = {
            type: Quiz.QUIZ_TYPES_UNGRADED,
            title: "TEST",
            instructions: null,
            durationInMins: 10,
            courseId: 1,
            sectionId: 1,
            passScoreRequirement: null,
            active: false
        }
    });
    
    it('Create valid UNGRADED quiz', () => {
        for(let i = 0; i < 2; i++){
            const q = Object.assign({}, quiz);
            
            if(i == 1){ q.instructions = "TEST" }
            
            const result = Quiz.createQuiz(q);
            assert(result != null);
        }
    });
    
    it('Create invalid UNGRADED quiz', () => {
        for(let i = 0; i < 6; i++){
            const q = Object.assign({}, quiz);

            if(i == 0){ q.type = null}
            else if (i == 1){ q.title = null }
            else if (i == 2){ q.durationInMins = null }
            else if (i == 3){ q.courseId = null }
            else if (i == 4){ q.sectionId = null }
            else if (i == 5){ q.passScoreRequirement = 1 }

            const result = Quiz.createQuiz(q);
            if(result != null){
                console.log("ERROR: " + i);
            }
            assert(result == null);
        }
    });
});