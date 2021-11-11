// const db = require("../models");
// const PrerequisiteSet = db.PrerequisiteSet;
// const Op = db.Sequelize.Op;
// const AccountController = require("./account.controller");
// const { CoursePrerequisite } = require("../models");

// exports.newPrerequisiteSetCoursePrereq = async(req, res) => {

//   const permissions = [AccountController.PERM_ADMIN]
//   AccountController.validAuthNAccess(req, res, permissions).then(session => {
//     if(session){
//       const courseId = req.body.courseId;
//     PrerequisiteSet.findOne({
//       order: [ [ 'setNumber', 'DESC' ]],
      
//       }).then(reqset=>{
//         console.log(reqset)
//         if(reqset!=null){
//           var lastSet = reqset.setNumber
//         }else{
//           var lastSet = 0
//         }
//         var prerequisite = req.body.prerequisite
//         var prerequisiteSet = []
//         var setNumbers = {courseId: courseId, setNumber: lastSet + 1}
        
//         for(var i=0;i<prerequisite.length;i++){
//           prerequisiteSet.push({setNumber: 1+lastSet, course_fk: prerequisite[i]})
//         }

//         // res.send({setNumbers: setNumbers, prerequisiteSet: prerequisiteSet})

//         PrerequisiteSet.bulkCreate(prerequisiteSet).then(
//           prereqsets=>{
//             console.log(prereqsets)
//             CoursePrerequisite.bulkCreate([{courseId: courseId, setNumber: lastSet + 1}]).then(
//               courseprereq=>{
//                 res.send({message: "Course Prerequisites were created successfully"})
//               }
//             ).catch(err => {
//               res.status(500).send({
//                 message:
//                   err.message || "Some error occurred while creating course prerequisite set association."
//               });
//             });
            
//           }
//         ).catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while creating prerequisite Sets."
//           });
//         });

      
//       }).catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving latest prerequisite sets."
//         });
//       });
//     }
    
//   })

// }

// exports.create = (req,res) =>{
//     if(!req.body){
//         res.status(400).send({
//             message: "Request body is empty!"
//         })
//         return
//     }

//     const prerequisiteSet = {
//       setNumber: req.body.setNumber,
//       courseId: req.body.courseId
//     }

//     PrerequisiteSet.create(prerequisiteSet)
//     .then(data=>{
//         res.send(data)
//     }).catch(err=>{
//         res.status(500).send({
//             message:
//             err.message || "Some error occured while creating the Message"
//         })
//     })
// }

// exports.findAll = (req, res) => {

//   PrerequisiteSet.findAll({ where: {

//   } })
//     .then(data => {
//       res.send(data); //change this to render
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving PrerequisiteSet."
//       });
//     });
// };

// exports.findAllByCourseFK = (req, res) => {

//     const course_fk = req.body.course_fk;
    
//     PrerequisiteSet.findAll({ where: {
//       course_fk : course_fk
//     }})
//       .then(data => {
//         res.send(data); //change this to render
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving prerequisite Sets."
//         });
//       });
//   };

//   exports.findAllBySetNumber = (req, res) => {

//     const setNumber = req.body.setNumber;
    
//     PrerequisiteSet.findAll({ where: {
//       setNumber : setNumber
//     }})
//       .then(data => {
//         res.send(data); //change this to render
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving prerequisite Sets."
//         });
//       });
//   };
