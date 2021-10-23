const db = require("../models");
const PrerequisiteSet = db.PrerequisiteSet;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const prerequisiteSet = {
      setNumber: req.body.setNumber,
      course_fk: req.body.course_fk
    }

    PrerequisiteSet.create(prerequisiteSet)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the Message"
        })
    })
}

exports.findAll = (req, res) => {

  PrerequisiteSet.findAll({ where: {

  } })
    .then(data => {
      res.send(data); //change this to render
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PrerequisiteSet."
      });
    });
};

exports.findAllByCourseFK = (req, res) => {

    const course_fk = req.body.course_fk;
    
    PrerequisiteSet.findAll({ where: {
      course_fk : course_fk
    }})
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving prerequisite Sets."
        });
      });
  };

  exports.findAllBySetNumber = (req, res) => {

    const setNumber = req.body.setNumber;
    
    PrerequisiteSet.findAll({ where: {
      setNumber : setNumber
    }})
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving prerequisite Sets."
        });
      });
  };
