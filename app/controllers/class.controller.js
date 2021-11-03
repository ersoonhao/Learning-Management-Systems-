const { Class, Account } = require("../models");
const AccountController = require("./account.controller");

// const db = require("../models");
// const Class = db.Class;
// const Op = db.Sequelize.Op;

exports.createClass = (req,res) => {

    const permissions = [AccountController.PERM_ADMIN]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){
            if(!req.body.class || !req.body.class.maxCapacity || !req.body.class.classStartDateTime || !req.body.class.classEndDateTime || !req.body.class.selfEnrollStartDateTime || !req.body.class.selfEnrollEndDateTime || !req.body.class.trnAccountId){
                res.status(400).send({
                    message: "Content cannot be empty! Fill it up"
                })
                return
            }
            //console.log(req.body.class);

            //Create Class - WORKS
            const _Class = {
                classStartDateTime: req.body.class.classStartDateTime,
                classEndDateTime: req.body.class.classEndDateTime,
                selfEnrollStartDateTime: req.body.class.selfEnrollStartDateTime,
                selfEnrollEndDateTime: req.body.class.selfEnrollEndDateTime,
                maxCapacity: req.body.class.maxCapacity,
                courseId: req.body.courseId,
                trnAccountId: req.body.class.trnAccountId,
                adminAccountId: session.accountId
            }

            console.log(_Class)

            Class.create(_Class)
                .then(data =>{
                    res.send({ "class": data });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error detected while creating Class"
                    })
                })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/class/createClass
        {
            "courseId": "1",
            "class": {
                "classStartDateTime": "2021-11-05",
                "classEndDateTime": "2021-11-06",
                "selfEnrollStartDateTime": "2021-11-03",
                "selfEnrollEndDateTime": "2021-11-04",
                "maxCapacity": 50,
                "trnAccountId": 1
            },
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}


// since HR is entering all this, they have the option to edit all these values
// classId is auto increment so it wont be in the list

//Update attributes using classId - WORKS
exports.updateClass = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){
            if(!req.body.class || !req.body.class.classId || !req.body.class.maxCapacity || !req.body.class.classStartDateTime || !req.body.class.classEndDateTime || !req.body.class.selfEnrollStartDateTime || !req.body.class.selfEnrollEndDateTime || !req.body.class.trnAccountId){
                res.status(400).send({
                    message: "Content cannot be empty! Fill it up"
                })
                return
            }

            const _Class = {
                classStartDateTime: req.body.class.classStartDateTime,
                classEndDateTime: req.body.class.classEndDateTime,
                selfEnrollStartDateTime: req.body.class.selfEnrollStartDateTime,
                selfEnrollEndDateTime: req.body.class.selfEnrollEndDateTime,
                maxCapacity: req.body.class.maxCapacity,
                trnAccountId: req.body.class.trnAccountId,
                adminAccountId: session.accountId
            }

            Class.update(_Class, {
                where: {classId : req.body.class.classId}
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
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/class/updateClass
        {
            "class": {
                "classStartDateTime": "2021-11-05",
                "classEndDateTime": "2021-11-06",
                "selfEnrollStartDateTime": "2021-11-03",
                "selfEnrollEndDateTime": "2021-11-04",
                "maxCapacity": 50,
                "trnAccountId": 1,
            },
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
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
            let courseId = req.body.courseId;
            if(!courseId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            Class.findAll({ 
                where: {courseId: courseId},
                include: Account
            })
                .then(data => {
                    res.send({ "classes": data })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving available classes by courseId"
                    })
                })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/class/getCourseClasses
        {
            "courseId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
exports.getCourseClass = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { 
        if(session){
            let classId = req.body.classId;
            if(!classId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            Class.findOne({ 
                where: {classId: classId},
                include: Account
            })
                .then(data => {
                    console.log(data)
                    res.send({ "class": data })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving available classes by courseId"
                    })
                })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/class/getCourseClasses
        {
            "classId": 9,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
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


