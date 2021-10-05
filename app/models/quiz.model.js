module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("Quiz", {
        quizId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type:{
            type:Sequelize.STRING(20)
        },
        title:{
            type:Sequelize.STRING(100)
        },
        instructions:{
            type:Sequelize.STRING(500) //Optional
        },
        durationInMins: {
            type: Sequelize.INTEGER
        },
        courseId: {
            type: Sequelize.INTEGER
        },
        sectionId: {
            type: Sequelize.INTEGER
        },
        passScoreRequirement: {
            type: Sequelize.FLOAT //Range: 0 to 1
        },
        active:{
            type: Sequelize.BOOLEAN //Optional
        }
    });
    
    Quiz.QUIZ_TYPES_GRADED = 'G';
    Quiz.QUIZ_TYPES_UNGRADED = 'UG';

    //Public
    Quiz.createQuiz = function (quiz, courseId, sectionId) {
        if(quiz == null){
            return null;
        }
        delete quiz.quizId;

        quiz.courseId = courseId
        quiz.sectionId = sectionId

        if(isValidQuiz(quiz, true)){
            return quiz;
        }
        return null;
    }
    Quiz.updateQuiz = function (quiz) {
        if(quiz == null){
            return null;
        }
        delete quiz.courseId;
        delete quiz.sectionId;

        if(isValidQuiz(quiz, false)){
            return quiz;
        }
        return null;
    }

    //Private
    function isValidQuiz(quiz, isNew){
        if(quiz.type == null || ![Quiz.QUIZ_TYPES_GRADED, Quiz.QUIZ_TYPES_UNGRADED].includes(quiz.type) || 
        quiz.title == null || quiz.durationInMins == null || quiz.durationInMins <= 0 || quiz.active == null){
            console.log("Quiz Error: 2");
            return false;
        }
        if((isNew && quiz.quizId != null || isNew && quiz.courseId == null) || (!isNew && quiz.quizId == null)){
            console.log("Quiz Error: 3");
            return false;
        }
        if(quiz.type == Quiz.QUIZ_TYPES_GRADED){
            //Graded
            if(!(quiz.sectionId == null && quiz.passScoreRequirement != null && quiz.passScoreRequirement >= 0 && quiz.passScoreRequirement <= 1)){
                console.log("Quiz Error: 4");
                return false;
            }
            
        }else if(quiz.type == Quiz.QUIZ_TYPES_UNGRADED){
            //Ungraded
            if(isNew && quiz.sectionId == null){
                console.log("Quiz Error: 5");
                return false;
            }
            if(quiz.passScoreRequirement != null){
                console.log("Quiz Error: 6");
                return false;
            }
        }
        return true;
    }
    return Quiz; 
};
  