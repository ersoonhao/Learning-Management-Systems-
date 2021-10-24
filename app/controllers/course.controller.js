const db = require("../models");
const { Course, PrerequisiteSet, CoursePrerequisite } = require("../models");
const Op = db.Sequelize.Op;

exports.findOneCourse = (req,res)=>{

  const id = req.params.id;

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

