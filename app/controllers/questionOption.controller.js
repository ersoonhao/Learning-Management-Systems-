const db = require("../models");
const QuestionOption = db.QuestionOption;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const questionOption = {
        questionOptionId: req.body.questionOptionId, 
        option: req.body.option, 
        isCorrect: req.body.isCorrect, 
        questionId: req.body.questionId,
    }

    QuestionOption.create(questionOption)
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

    const questionId = req.body.questionId;
    var condition = questionId ? { questionId: { [Op.like]: `%${questionId}%` } } : null;
  
    QuestionOption.findAll({where: condition})
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
  