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
          type:Sequelize.STRING(500)
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
      }
      
    });
  
    return Quiz; 
  };
  