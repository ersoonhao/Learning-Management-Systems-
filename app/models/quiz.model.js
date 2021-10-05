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
            type: Sequelize.INTEGER
        },
        active:{
            type: Sequelize.BOOLEAN //Optional
        }
    });

    Quiz.QUIZ_TYPES_GRADED = 'G';
    Quiz.QUIZ_TYPES_UNGRADED = 'UG';

    //Public Methods
    Quiz.createQuiz = function (quiz) {
        if(isValidQuiz(quiz, true)){
            return quiz;
        }
        return null;
    }
    Quiz.updateQuiz = function (quiz) {
        if(isValidQuiz(quiz, false)){
            return quiz;
        }
        return null;
    }
    

    //Private
    function isValidQuiz(quiz, isNew){
        if(quiz.type == null || ![Quiz.QUIZ_TYPES_GRADED, Quiz.QUIZ_TYPES_UNGRADED].includes(quiz.type) || 
        quiz.title == null || quiz.durationInMins == null || quiz.durationInMins <= 0 || quiz.courseId == null){
            return false;
        }
        if(!((isNew && quiz.quizId == null) || (!isNew && quiz.quizId != null))){
            return false;
        }
        if(quiz.type == Quiz.QUIZ_TYPES_GRADED){
            //Graded
            if(!(quiz.sectionId == null && quiz.passScoreRequirement != null && quiz.passScoreRequirement >= 0)){
                return false;
            }
            
        }else if(quiz.type == Quiz.QUIZ_TYPES_UNGRADED){
            //Ungraded
            if(!(quiz.sectionId != null && quiz.passScoreRequirement == null)){
                return false;
            }
        }
        return true;
    }
    return Quiz; 
};
  