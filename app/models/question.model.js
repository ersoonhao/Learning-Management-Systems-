// CONTRIBUTOR: Robin Chong
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("Question", {
        questionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question: {
            type:Sequelize.STRING(500)
        },
        autoGraded: {
            type:Sequelize.BOOLEAN 
        },
        type: {
            type:Sequelize.STRING(10) //'MCQ'
        }, 
        quizId: {
            type: Sequelize.INTEGER
        }
    });

    Question.QUESTION_TYPES_MCQ = 'MCQ';

    //Public
    Question.createQuestion = function(question, quizId){
        if(question == null){
            return null;
        }
        delete question.questionId;

        question.quizId = quizId;

        if(isValidQuestion(question, true)){
            return question;
        }
        return null;
    }
    Question.updateQuestion = function(question){
        if(question == null){
            return null;
        }
        delete question.quizId;

        if(isValidQuestion(question, false)){
            return question;
        }
        return null;
    }

    //Private
    function isValidQuestion(question, isNew){
        if((isNew && question.quizId == null) || (!isNew && question.questionId == null)){
            console.log("Question Error: 1");
            return false;
        }
        if(question.question == null || question.autoGraded == null || question.type == null || 
            ![Question.QUESTION_TYPES_MCQ].includes(question.type)){
            console.log("Question Error: 2");
            return false;
        }
        return true;
    }

    return Question; 
};
  