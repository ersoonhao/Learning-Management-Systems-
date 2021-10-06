// CONTRIBUTOR: Robin Chong
const vld = require("./validator");

module.exports = (sequelize, Sequelize) => {
    const QuestionOption = sequelize.define("QuestionOption", {
        questionOptionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        option:{
            type:Sequelize.STRING(250)
        },
        isCorrect:{
            type:Sequelize.BOOLEAN 
        },
        questionId:{
            type:Sequelize.INTEGER
        }
    });

    //Public
    QuestionOption.createQuestionOption = function(option, questionId){
        if(option == null){
            return null;
        }
        delete option.questionOptionId;

        option.questionId = questionId;

        if(isValidOption(option, true)){
            return option;
        }
        return null;
    }
    QuestionOption.updateQuestionOption = function(option){
        if(option == null){
            return null;
        }
        delete option.questionId;

        if(isValidOption(option, false)){
            return option;
        }
        return null;
    }
    
    //Private
    function isValidOption(option, isNew){
        if((isNew && option.questionId == null) || (!isNew && option.questionOptionId == null)){
            console.log("Option Error: 1");
            return false;
        }
        if(option.option == null || option.isCorrect == null){
            console.log("Option Error: 2");
            return false; 
        }
        if(!(vld.validType(option.questionOptionId, 'number') && vld.validType(option.option, 'string') && vld.validType(option.isCorrect, 'boolean') && vld.validType(option.questionId, 'number'))){
            console.log("Option Error: 3");
            return false;
        }
        return true;
    }
    
    return QuestionOption; 
};
  