const db = require("../models");

const Class = db.Class;
const Op = db.Sequelize.Op;

exports.createClass = (req,res) => {

    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){

            if(!req.body.class.maxCapacity || !req.body.class.classStartDateTime || !req.body.class.classEndDateTime || !req.body.class.selfEnrollStartDateTime || !req.body.class.selfEnrollEndDateTime){
                res.status(400).send({
                    messgae: "Content cannot be empty! Fill it up"
                })
                return
            }

            //Create Class - WORKS
            const _Class = {
                classId: req.body.class.classId,
                classStartDateTime: req.body.class.classStartDateTime,
                classEndDateTime: req.body.class.classEndDateTime,
                selfEnrollStartDateTime: req.body.class.selfEnrollStartDateTime,
                selfEnrollEndDateTime: req.body.class.selfEnrollEndDateTime,
                maxCapacity: req.body.class.maxCapacity,
                courseId: req.body.courseId,
                trnAccountId: req.body.class.trnAccountId,
                adminAccountId: req.body.class.adminAccountId
            }

            // console.log(class)

            Class.create(_Class)
                .then(data =>{
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error detected while creating Class"
                    })
                })
        }
    })
}


// since HR is entering all this, they have the option to edit all these values
// classId is auto increment so it wont be in the list

//Update attributes using classId - WORKS
exports.updateClass = (req, res) => {

    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){

            const id = req.params.classId;

            Class.update(req.body, {
                where: {classId : id}
            })
            .then(num => {
                if(num == 1){
                    res.send({
                        message: "Class has been updated successfully"
                    })
                } else {
                    res.send({
                        message: `Cannot update Class with classId=${id}`
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Class with classId = " + id
                })
            })
        }
    })
}

//Get available course classes - WORKS - KIV
// change top one to match the class diagram

// exports.getAllClasses = (req, res) => {
//     const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
//     AccountController.validAuthNAccess(req, res, permissions).then(session => { 
//         if(session){
//             Class.findAll()
//                 .then(data => {
//                     res.send(data)
//                 })
//                 .catch(err => {
//                     res.status(500).send({
//                         message:
//                             err.message || "Some errors occured while retrieving available classes"
//                     });
//                 });
//         }
//     })
// }


// <TODO> Get available classes using CourseID - WORKS -> need isCourseTrainer(session) for a particular course
// need check if user is learner/admin/trainer
// use session.isTrainer --> return t or f
// if t, check if trainer for particular course and select his class??  
// if f and isAdmin == true allow to retrieve data

// change all the findAll to get classes by courseID

//Asher --> Enrollment Controller need getNoOfEnrollments (classID) -->if current capacity < maxCapacity --> getAvailableCourseClass mthd (no access restriction)

exports.getCourseClasses = (req, res) => {

    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){

            const courseId = req.params.courseId;
            var condition = courseId ? { courseId: { [Op.like]: `%${courseId}%` } } : null;

            Class.findAll({ where: condition })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving available classes by courseId"
                    })
                })
        }
    })
}

// <TODO> isClassTrainer?? Private method and need trainerAcct and classId? returns Boolean --> Use session

// exports.isClassTnr = (req,res) => {
//     const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    

//     // var condition = 
//     AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
//         const trnAccountId = req.params.trnAccountId;
//         var condition = trnAccountId ?

//         Class.isClassTnr()
//             .then(data => {
//                 res.status(200).send({
//                     message: "True"

//                 })
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     message:
//                         err.message || "False"
//                 });
//             });


//         // if(session.isTrainer != trnAccountId){
//         //     return false;
//         // }
//         // else{
//         //     return true; wrong
//         // }
//     })
// }


