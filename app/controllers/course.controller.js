const db = require("../models");
const Course = db.Course;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const course = {
        title: req.body.title, 
        description: req.body.description, 
    
    }

    Course.create(course)
    .then(data=>{
        res.send(data) //change this to render
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the course"
        })
    })
}

exports.findAll = (req, res) => {
  
    Course.findAll()
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Course.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Course with id=" + id
        });
      });
  };