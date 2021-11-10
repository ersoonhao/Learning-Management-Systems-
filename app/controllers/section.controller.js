// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process.
// require('dotenv').config()

// s3 imports statement 
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// S3 Keys 

// const bucketName="spm-files-upload"
// const region="ap-southeast-1"
const accessKeyId = "AKIARW74HBZIRY7PNJ5G"
const secretAccessKey = "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"
const AccountController = require("./account.controller");

// s3 init
// const s3= new S3({
//     region,
//     accessKeyId,
//     secretAccessKey
// })



const db = require("../models");

// need to create an account table
// const Section = db.Section; 
const Op = db.Sequelize.Op;
const { Section, CourseMaterial } = require("../models");
// helper function to hash. Not used yet.Use if required.
async function hash(password) {
    return await bcrypt.hash(password, 10);
}






// Q
// what is section package? 
// accounts for validation? 
// basic CRUD for section is done 

//to-do 
// isSectionTrainer
// getSectionPackage
// createSection X 
// updateSection X 


// Added:
// deleteSection X 
// findAllSection X 
// deleteAllSection X 

// S3 related NOT DONE 
// addCourseMaterial - Not linked to Upload middleware yet. 
// updateCoursematerial Skipped 
// deleteCourseMaterial X 


// private functions 
function isSectionTrainer(Account, SectionId) {
    // ??? 
    Course.findOne({
        where: { courseId: courseId },
        include: {
            model: Class,
            include: {
                model: Enrollment,
                where: { accountId: session.accountId }
            }
        }
    }).then(data => {
        res.send({
            "data": data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured obtaining data"
        })
    });

    return true;
}


function getAllCourseMaterials() {
    console.log("called from server.js")

    return true;
}
exports.getAllCourseMaterials = getAllCourseMaterials


//======== START: COURSE MATERIAL  ========
function addCourseMaterial(title, instructions, source, type, ordering, sectionId, key) {
    if (!title || !ordering || !source || !sectionId) {
        return false;
    }
    const coursematerial = {
        title,
        instructions,
        source,
        type,
        ordering,
        sectionId,
        key
    }

    CourseMaterial.create(coursematerial)
        .then(result => {
            if (result) {
                return true;
            }
            return false;
        }).catch(err => {
            console.log(err);
            return false;
        });
    return true;
}
exports.addCourseMaterial = addCourseMaterial
    // Create and Save a Section 
exports.addCourseMaterial2 = (req, res) => {
    // Validate request
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            if (!req.body.title || !req.body.ordering || !req.body.source) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }

            const coursematerial = {
                title: req.body.title,
                instructions: req.body.instructions,
                source: req.body.source,
                type: req.body.type, //file type.
                ordering: req.body.ordering
            };
            console.log(coursematerial);

            CourseMaterial.create(coursematerial)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Section"
                    });
                });
        }
    })
};

// delete by ID
exports.deleteCourseMaterial = (req, res) => {
    // Validate request
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            if (!req.body.title || !req.body.ordering || !req.body.source) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            const courseMaterialId = req.body.courseMaterialId;


            CourseMaterial.destroy({
                    where: { CourseMaterialId: courseMaterialId }
                })
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the deleting the Course Matertial with ID" + courseMaterialId
                    });
                });
        }
    })
};


//======== END: COURSE MATERIAL  ========



//======== START: SECTION  ========
exports.getSectionPackage = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            let body = req.body;
            let classId = req.body.classId;

            if (!classId) {
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            //TODO: Check if learner is enrolled & has completed previous sections
            Section.findAll({
                where: { classId: classId },
                include: [{ model: db.CourseMaterial }, { model: db.Quiz }]

            }).then(sections => {
                res.send({ "sections": sections });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured obtaining data"
                })
            });
        }
    })
}






// routed 
// Create and Save a Section 
exports.createSection = (req, res) => {
    // Validate request
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {

            if (!req.body.subtitle || !req.body.subtitle || !req.body.ordering) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            const section = {
                classId: req.body.classId,
                title: req.body.title,
                subtitle: req.body.subtitle,
                ordering: req.body.ordering
            };

            Section.create(section)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Section"
                    });
                });
        }
    })

};




// routed 
exports.findAllSection = (req, res) => {


    // handle the request
    Section.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving section."
            });
        });
}

// end of the request









exports.findOne = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {

            if (!req.params.id) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }

            // handle the request
            const id = req.params.id;

            Section.findByPk(id)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving Account with id=" + id
                    });
                });
            // end of the request
        }
    })
}

// routed 
exports.deleteSection = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            if (!req.body.sectionId) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            // handle the request
            const id = req.body.sectionId;
            Section.destroy({
                    where: { sectionId: id }
                })
                .then(result => {
                    if (result == 1) {
                        res.send({
                            status: 200,
                            message: `Section ${id} deleted successfully`
                        });
                    } else {
                        res.send({
                            status: 401,
                            message: `Cannot delete Section ${id}. Section not found`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error deleting Section" + id
                    });
                });
            // end of the request
        }
    })
}






// routed 
// Update Section why need account?
// update based on req.body
// validation not done hence throw error if something goes wrong



exports.updateSection = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            if (!req.body.id || !req.body.subtitle || !req.body.description || !req.body.ordering) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            // handle the request
            const id = req.body.id;

            Section.update(req.body, {
                    where: { id: id }
                })
                .then(num => {
                    if (num == 1) {
                        res.status(200).send({
                            message: `Section ${id} was updated successfully.`
                        });
                    } else {
                        res.status(401).send({
                            message: `Cannot update Section ${id}. Section was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Section with id=" + id
                    });
                });

            // end of the request
        }
    })
}



// routed 
exports.deleteAllSection = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {

            // handle the request
            Section.destroy({
                    where: {},
                    truncate: false
                })
                .then(num => {
                    res.status(200).send({
                        message: `${num} Section were deleted successfully.`
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error deleting Section"
                    });
                });
            // end of the request
        }
    })
}




//======== END: SECTION  ========


//======== END: SECTION  ========