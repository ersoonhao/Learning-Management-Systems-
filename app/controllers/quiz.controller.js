const db = require("../models");
const Quizzes = db.Quizzes;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const quiz = {
        type: req.body.type, 
        title: req.body.title, 
        instructions: req.body.instructions, 
        durationInMins: req.body.durationInMins,
        courseId:req.body.courseId,
        sectionId:req.body.sectionId,
        passScoreRequirement:req.body.passScoreRequirement
    }

    Quizzes.create(quiz)
    .then(data=>{
        res.send(data) //change this to render
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the quiz"
        })
    })
}

exports.findAll = (req, res) => {
  
    Quizzes.findAll()
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving quizzes."
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Quizzes.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Quiz with id=" + id
        });
      });
  };