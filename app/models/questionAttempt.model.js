// CONTRIBUTOR: Robin Chong
const vld = require("./validator");

module.exports = (sequelize, Sequelize) => {
    const QuestionAttempt = sequelize.define("QuestionAttempt", {
        questionAttemptId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        isCorrect: {
            type: Sequelize.BOOLEAN
        },
        quizAttemptId: {
            type:Sequelize.INTEGER
        },
        questionOptionId: {
            type:Sequelize.INTEGER 
        }
    });

    //Public
    QuestionAttempt.createQuestionAttempt = function(quizAttemptId, questionOptionId){
        let questionAttempt = {
            quizAttemptId: quizAttemptId,
            questionOptionId: questionOptionId
        }
        if(isValidQuestionAttempt(questionAttempt, true)){
            return questionAttempt;
        }
        return null;
    }
    QuestionAttempt.markQuestion = function(questionAttemptId, isCorrect){
        let questionAttempt = {
            questionAttemptId: questionAttemptId,
            isCorrect: isCorrect
        }
        if(isValidQuestionAttempt(questionAttempt, false)){
            return questionAttempt;
        }
        return null;
    }

    //Private
    function isValidQuestionAttempt(questionAttempt, isNew){
        if((isNew && (questionAttempt.quizAttemptId == null || questionAttempt.questionOptionId == null)) || 
            (!isNew && questionAttemptId == null)){
            console.log(`QuestionAttempt Error: 1`);
            return false;
        }
        if(!(vld.validType(questionAttempt.isCorrect, 'boolean') && vld.validType(questionAttempt.quizAttemptId, 'number') && vld.validType(questionAttempt.questionOptionId, 'number'))){
            console.log("QuestionAttempt Error: 2");
            return false;
        }
        return true;
    }
    return QuestionAttempt; 
};
  