const db = require("../models");
const CoursePrerequisite = db.CoursePrerequisite;
const AccountController = require("./account.controller");
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
      courseId: req.body.courseId
    }

    CoursePrerequisite.create(prerequisiteSet)
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

  CoursePrerequisite.findAll({ where: {

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

exports.findAllByCourseId = (req, res) => {

    const courseId = req.body.courseId;
    
    CoursePrerequisite.findAll({ where: {
      courseId : courseId
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
    
    CoursePrerequisite.findAll({ where: {
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

exports.deleteBySetNumberCourseFK = (req, res) => {
  const permissions = [AccountController.PERM_ADMIN]
  AccountController.validAuthNAccess(req, res, permissions).then(session => {

  const courseId = req.body.courseId;
  const setNumber = req.body.setNumber;
  
  CoursePrerequisite.destroy({
      where: { courseId: courseId, setNumber: setNumber }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "set was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete set with course Id=${courseId} and set number = ${setNumber}. Maybe Set was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with set number=" + setNumber
        });
      });
    })
  
  };

