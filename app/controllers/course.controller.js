const db = require("../models");
const { Course, PrerequisiteSet, CoursePrerequisite } = require("../models");
const Op = db.Sequelize.Op;
const AccountController = require("./account.controller");

exports.findOneCourse = (req,res)=>{
  const permissions = []
  AccountController.validAuthNAccess(req, res, permissions).then(session => {
    const id = req.body.id;

    Course.findOne({
      where: {courseId: id},
      include: [ { model: CoursePrerequisite, include: [PrerequisiteSet] } ]
    }).then(data => {
      res.send({ "course": data });
  }).catch(err=>{
      res.status(500).send({
          message: err.message || "Some error occured obtaining data"
      })
  });
  })
  
}

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    if(req.body.courseId){
      const course = {
        courseId : req.body.courseId,
        title: req.body.title, 
        description: req.body.description, 
        active: req.body.active
    }
    Course.create(course)
    .then(courseData=>{
         //change this to render
      if(req.body.prerequisite){
        PrerequisiteSet.findOne({
          order: [ [ 'setNumber', 'DESC' ]],
          
          }).then(reqset=>{
            var lastSet = reqset.setNumber
            var prerequisite = req.body.prerequisite
            var prerequisiteSet = []
            var setNumbers = []
            
            for(var i=0;i<prerequisite.length;i++){
            
              setNumbers.push({setNumber: i+1+lastSet, courseId: courseData.courseId})
              for(var j=0;j<prerequisite[i].length;j++){
                prerequisiteSet.push({course_fk: prerequisite[i][j],setNumber: i+1+lastSet})
              }
            }

            PrerequisiteSet.bulkCreate(prerequisiteSet).then(
              prereqsets=>{
                CoursePrerequisite.bulkCreate(setNumbers).then(
                  courseprereqs=>{
                    // res.send([courseData,reqset, prerequisiteSet, setNumbers,prereqsets,courseprereqs])
                    res.send({course_data: courseData,prerequisite_sets: prereqsets,course_sets: courseprereqs})
                  }
                )
              }
            )

          
          })
      }else{
        res.send({course_data: courseData})
      }

    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the course"
        })
    })
    }else{
      const course = {
        title: req.body.title, 
        description: req.body.description, 
        active: req.body.active
    }
    Course.create(course)
    .then(courseData=>{
         //change this to render
      if(req.body.prerequisite){
        PrerequisiteSet.findOne({
          order: [ [ 'setNumber', 'DESC' ]],
          
          }).then(reqset=>{
            var lastSet = reqset.setNumber
            var prerequisite = req.body.prerequisite
            var prerequisiteSet = []
            var setNumbers = []
            
            for(var i=0;i<prerequisite.length;i++){
            
              setNumbers.push({setNumber: i+1+lastSet, courseId: courseData.courseId})
              for(var j=0;j<prerequisite[i].length;j++){
                prerequisiteSet.push({course_fk: prerequisite[i][j],setNumber: i+1+lastSet})
              }
            }

            PrerequisiteSet.bulkCreate(prerequisiteSet).then(
              prereqsets=>{
                CoursePrerequisite.bulkCreate(setNumbers).then(
                  courseprereqs=>{
                    // res.send([courseData,reqset, prerequisiteSet, setNumbers,prereqsets,courseprereqs])
                    res.send({course_data: courseData,prerequisite_sets: prereqsets,course_sets: courseprereqs})
                  }
                )
              }
            )

          
          })
      }else{
        res.send({course_data: courseData})
      }

    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the course"
        })
    })
    }

    
}

exports.findAll = (req, res) => {
  const permissions = []
  AccountController.validAuthNAccess(req, res, permissions).then(session => {
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
  })
};

exports.findAllPostAdmin = (req, res) => {

  const permissions = [AccountController.PERM_ADMIN]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
      if(session){
        Course.findAll()
        .then(data => {
          res.send(data); //change this to render
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Course with id=" + id
          });
        });
      }
    })
  };

  

exports.findAllId = (req, res) => {
    var ids = []
    Course.findAll()
      .then(data => {
        for(var i=0; i<data.length; i++){
          ids.push(data[i]['courseId'])
          
        }
        res.send(ids); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

  exports.findAllIdTitle = (req, res) => {
    var id_title = []
    Course.findAll()
      .then(data => {
        for(var i=0; i<data.length; i++){
          id_title.push({courseId: data[i]['courseId'], title: data[i]['title']})
          
        }
        res.send(id_title); //change this to render
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

  exports.delete = (req, res) => {
    const courseId = req.body.courseId;
  
    Course.destroy({
      where: { courseId: courseId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Course with id=${courseId}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with id=" + courseId
        });
      });
  };

  exports.coursePrereqDelete = (req, res) => {
    const courseId = req.body.courseId;
    const setNumber = req.body.setNumber;
  
    CoursePrerequisite.destroy({
      where: { courseId: courseId , setNumber: setNumber}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course prerequisite set was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Course prerequisite set with courseId=${courseId} and setNumber=${setNumber}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with courseId=" + courseId+" and setNumber="+setNumber
        });
      });
  };