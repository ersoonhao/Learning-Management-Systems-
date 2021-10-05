// const db = require("../models");
// const { Quizzes } = require("../models");
// const { Questions } = require("../models");
// const { QuestionOptions } = require("../models");
// const { Course } = require("../models");

// var initial_quizzes = [
//     {type:'graded', title: 'Demand Quiz', instructions: 'For the demand quiz', durationInMins: '10',courseId:'1',sectionId:'2',passScoreRequirement:'5'},
//     {type:'graded', title: 'Supply Quiz', instructions: 'For the supply quiz', durationInMins: '10',courseId:'1',sectionId:'2',passScoreRequirement:'5'}
//   ]
  
//   var initial_questions = [
//     {question: "Are we awesome?", autoGraded: true,type:0, quizId: 1},
//     {question: "John is messed up", autoGraded: true,type:1, quizId: 1}
//   ]
  
//   var initial_question_options = [
//     {option: "Yes we are awesome",isCorrect:false, questionId:1},
//     {option: "No we are lame",isCorrect:true, questionId:1},
//     {option: "True",isCorrect:true, questionId:2},
//     {option: "False",isCorrect:false, questionId:2}
//   ]
  
//   // { force: true }
// async function createTables(){
//   await db.sequelize.sync({ force: true }).then(() => {
  
//     for(var i=0; i<initial_quizzes.length;i++){
//       Quizzes.create(initial_quizzes[i])
//     }
  
//     for(var j=0; j<initial_questions.length;j++){
//       Questions.create(initial_questions[j])
//     }
  
//     for(var j=0; j<initial_question_options.length;j++){
//       QuestionOptions.create(initial_question_options[j])
//     }
  
//     console.log("Drop and re-sync db.");
// });
// }

// createTables()
  