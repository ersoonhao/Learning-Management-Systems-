
// title is Mr / Ms. Gotta be polite yo. 
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("Question", {
        questionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question:{
            type:Sequelize.STRING(45)
        },
        autoGraded:{
            type:Sequelize.BOOLEAN 
        },
        type:{
            type:Sequelize.INTEGER
        }, //0 is MCQ, //1 is True False
        quizId: {
            type: Sequelize.INTEGER
        }
    });
    return Question; 
};
  