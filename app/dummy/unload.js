const db = require("../models");

module.exports.unload = () => {
    return db.sequelize.query(`
        DELETE FROM QuestionOptions;
        DELETE FROM Questions;
        DELETE FROM Quizzes;
        DELETE FROM Courses;
        DELETE FROM Accounts;
    `);
};

// //Course
// console.log("Unloading Course data");
// const Course = db.Course;

// Course.destroy({ where: {}, truncate: false })

// // Quiz, Question, QuestionOption
// console.log("Unloading Quiz, Question, QuestionOption data");

// const Quiz = db.Quiz;
// const Question = db.Question; 
// const QuestionOption = db.QuestionOption;

// Quiz.destroy({ where: {}, truncate: false })
// Question.destroy({ where: {}, truncate: false })
// QuestionOption.destroy({ where: {}, truncate: false })