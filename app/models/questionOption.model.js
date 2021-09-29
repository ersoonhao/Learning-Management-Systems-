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
  
    return QuestionOption; 
  };
  