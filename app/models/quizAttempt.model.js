// CONTRIBUTOR: Robin Chong
const vld = require("./validator");

module.exports = (sequelize, Sequelize) => {
    const QuizAttempt = sequelize.define("QuizAttempt", {
        quizAttemptId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        startDateAttempt: {
            type: Sequelize.DATEONLY
        },
        endDateAttempt: {
            type: Sequelize.DATEONLY
        }, 
        score: {
            type: Sequelize.INTEGER
        },
        quizId: {
            type:Sequelize.INTEGER 
        },
        enrollmentId: {
            type:Sequelize.INTEGER
        }
    });

    //Public
    QuizAttempt.createQuizAttempt = function(quizId, enrollmentId){
        let quizAttempt = {
            startDateAttempt: new Date().toISOString(),
            quizId: quizId,
            enrollmentId: enrollmentId
        }
        if(isValidQuizAttempt(quizAttempt, true)){
            return quizAttempt;
        }
        return null;
    }
    QuizAttempt.updateQuizAttempt = function(quizAttempt){
        if(quizAttempt == null){
            return null;
        }
        delete quizAttempt.quizId;
        delete quizAttempt.enrollmentId;

        if(isValidQuizAttempt(quizAttempt, false)){
            return quizAttempt;
        }
        return null;
    }

    //Private
    function isValidQuizAttempt(quizAttempt, isNew){
        if((isNew && (quizAttempt.quizAttemptId != null || quizAttempt.startDateAttempt == null || quizAttempt.endDateAttempt != null || quizAttempt.score != null || quizAttempt.quizId == null || quizAttempt.enrollmentId == null)) || 
        (!isNew && (quizAttempt.quizAttemptId == null))){
            console.log(`QuizAttempt Error: 1 ${quizAttempt.quizAttemptId} ${quizAttempt.startDateAttempt} ${quizAttempt.endDateAttempt} ${quizAttempt.score} ${quizAttempt.quizId} ${quizAttempt.enrollmentId}`);
            return false;
        }
        if(quizAttempt.startDateAttempt != null && quizAttempt.endDateAttempt != null && new Date(quizAttempt.startDateAttempt) > new Date(quizAttempt.endDateAttempt)){
            console.log("QuizAttempt Error: 2");
            return false;
        }
        if(!(vld.validType(quizAttempt.quizAttemptId, 'number') && vld.validType(quizAttempt.startDateAttempt, 'string') && vld.validType(quizAttempt.endDateAttempt, 'string') && 
        vld.validType(quizAttempt.score, 'number') && vld.validType(quizAttempt.quizId, 'number') && vld.validType(quizAttempt.enrollmentId, 'number'))){
            console.log("QuizAttempt Error: 3");
            return false;
        }
        return true;
    }
    return QuizAttempt; 
};
  