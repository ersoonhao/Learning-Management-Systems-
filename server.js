const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.json())
// test 
require("./app/routes/accounts.routes")(app)
require("./app/routes/turorial.routes")(app);
require("./app/routes/quiz.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/questionOption.routes")(app);

app.use(express.static(path));


// Cross-origin resource sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. 
// var corsOptions = {
//   origin: "*"
// };

// var corsOptions = {
//     origin: "api.akashic.technology/#/"
//   };


// app.use(cors(corsOptions));

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { Quizzes } = require("./app/models");
const { Questions } = require("./app/models");
const { QuestionOptions } = require("./app/models");

// added cors for aws?? 
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next();
//   });


// db.sequelize.sync();
// // drop the table if it already exists
var initial_quizzes = [
  {type:'graded', title: 'Demand Quiz', instructions: 'For the demand quiz', durationInMins: '10',courseId:'1',sectionId:'2',passScoreRequirement:'5'},
  {type:'graded', title: 'Supply Quiz', instructions: 'For the supply quiz', durationInMins: '10',courseId:'1',sectionId:'2',passScoreRequirement:'5'}
]

var initial_questions = [
  {question: "Are we awesome?", autoGraded: true,type:0, quizId: 1},
  {question: "John is fucked up", autoGraded: true,type:1, quizId: 1}
]

var initial_question_options = [
  {option: "Yes we are awesome",isCorrect:false, questionId:1},
  {option: "No we are fucking lame",isCorrect:true, questionId:1},
  {option: "True",isCorrect:true, questionId:2},
  {option: "False",isCorrect:false, questionId:2}
]
 
db.sequelize.sync({ force: true }).then(() => {

  for(var i=0; i<initial_quizzes.length;i++){
    Quizzes.create(initial_quizzes[i])
  }

  for(var j=0; j<initial_questions.length;j++){
    Questions.create(initial_questions[j])
  }

  for(var j=0; j<initial_question_options.length;j++){
    QuestionOptions.create(initial_question_options[j])
  }

  console.log("Drop and re-sync db.");
});

// app.get('/', function (req,res) {
//   console.log(path);
//   res.sendFile(path + "index.html");
// });

app.get('/quiz',async(req,res)=>{
  res.sendFile(path+"/quiz/create_quiz.html")
})


app.get("/test", (req, res) => {
    res.json({ message: "Test working @ port 8081" });
  });

// set port, listen for requests
const PORT = process.env.PORT || 8081;
// const PORT =  8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;