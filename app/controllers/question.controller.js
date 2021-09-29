const db = require("../models");
const Questions = db.Questions;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const question = {
        question: req.body.question, 
        autoGraded: req.body.autoGraded, 
        type: req.body.type, 
        quizId: req.body.quizId,
    }

    Questions.create(question)
    .then(data=>{
        res.send(data) //change this to render
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the question"
        })
    })
}

exports.findAll = (req, res) => {

    const quizId = req.body.quizId;
    var condition = quizId ? { quizId: { [Op.like]: `%${quizId}%` } } : null;
  
    Questions.findAll({where: condition})
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving questions."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Questions.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Question with id=" + id
        });
      });
  };
  