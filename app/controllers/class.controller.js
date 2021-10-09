const db = require("../models");

const Class = db.Class;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.class.maxCapacity || !req.body.class.classStartDateTime || !req.body.class.classEndDateTime || !req.body.class.selfEnrollStartDateTime || !req.body.class.selfEnrollEndDateTime){
        res.status(400).send({
            messgae: "Content cannot be empty! Fill it up"
        });
        return;
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
};

console.log(_Class)

Class.create(_Class)
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error detected while creating Class"
        });
    });
};

// since HR is entering all this, they have the option to edit all these values
// classId is auto increment so it wont be in the list

//Update attributes using classId - WORKS
exports.update = (req, res) => {
    const id = req.params.classId;

    Class.update(req.body, {
        where: {classId : id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Class has been updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Class with classId=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Class with classId = " + id
        });
    });
}

//Get available course classes - WORKS
exports.findAll = (req, res) => {


    Class.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some errors occured while retrieving available classes"
            });
        });
};

