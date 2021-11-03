const db = require("../models");
const Account = db.Account;
const Op = db.Sequelize.Op;

// async function hash(password) {
//     return await bcrypt.hash(password, 10);
// }

exports.PERM_ADMIN = "A";
exports.PERM_TRAINER = "T";

//Used interally
exports.validAuthNAccess = (req, res, requiredPerms) => {
    const failed = "Auth and access failed";
    return new Promise((resolve, _) => {
        if(!req.body || !req.body.session || !req.body.session.username || !req.body.session.sessionId || 
            req.body.session.username == undefined || req.body.session.sessionId == undefined){
            res.status(400).send({ message: "Invalid data format" })
            resolve(false);
            return
        }
        let q;
        let perm = []
        if (requiredPerms.includes(this.PERM_ADMIN)){
            perm.push({ isAdmin: { [Op.eq]: 1 } })
        }
        if (requiredPerms.includes(this.PERM_TRAINER)){
            perm.push({ isTrainer: { [Op.eq]: 1 } })
        }
        if(perm.length > 0){ q = { [Op.or]: perm } } else { q = {} }
        q.username = req.body.session.username
        q.sessionId = req.body.session.sessionId
        Account.findOne({ where: q }).then(data => {
            if(data == null){
                Account.findOne({ where: { username: q.username, sessionId: q.sessionId } }).then(data => {
                    if(data == null){
                        res.status(401).send({ message: failed })
                    }else{
                        res.status(403).send({ message: failed })
                    }
                }).catch(err => {
                    res.status(401).send({ message: failed })
                })
                return
            }
            resolve(data);
            return
        }).catch(err => {
            console.log(err)
            res.status(401).send({ message: failed })
            resolve(false);
            return
        });
    });
}

//==== POST: /login
exports.login = (req, res) => {
    //Simulate login from Azure AD
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Request body is empty!"
        });
        return;
    }
    let username = req.body.username;
    Account.findOne({ where: { username: username, password: req.body.password }}).then(data => {
        if(data == null){
            res.status(400).send({ message: `Wrong credentials` });
            return
        }
        const sid = (Math.random() + 1).toString(36).substring(7);
        Account.update({ sessionId: sid }, {
            where: {
                username: username
            }
        }).then(result => {
            if (result == 1) {
                res.send({
                    status: 200,
                    message: "Successful login",
                    session: { 
                        username: username, sessionId: sid, 
                        isAdmin: data.isAdmin, isTrainer: data.isTrainer 
                    }
                });
            } else {
                res.send({
                    status: 500,
                    message: `Error: Unable to login`
                });
            }
        }).catch(err => {
            console.log(`(2) ${err}`)
            res.status(500).send({
                message: `Error: Unable to login`
            });
        });
    }).catch(err => { 
        console.log(`(3) ${err}`)
        res.status(500).send({
            message: `Error: Unable to login`
        });
    });

    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/account/login
    { 
        "username": "robin",
        "password": "a"
    }
    */
}

//==== POST: /getTrainers
exports.getTrainers = (req, res) => {
    const permissions = [this.PERM_ADMIN]
    this.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            Account.findAll({
                where: { isTrainer: 1 },
            }).then(data => {
                res.send({ "trainers": data });
            }).catch(err=>{
                res.status(500).send({
                    message: err.message || "Some error occured obtaining data"
                })
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/account/getTrainers
        {
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
//==== POST: /getLearners
exports.getLearners = (req, res) => {
    const permissions = [this.PERM_ADMIN, this.PERM_TRAINER]
    this.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            Account.findAll().then(data => {
                res.send({ "learners": data });
            }).catch(err=>{
                res.status(500).send({
                    message: err.message || "Some error occured obtaining data"
                })
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > POST | localhost:8081/api/account/getLearners
        {
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}

// Create and Save a new account
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false, // if empty will be false.
        isTrainer: req.body.isTrainer ? req.body.isTrainer : false,
        isLearner: req.body.isLearner ? req.body.isLearner : false,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated
    };
    Account.create(account).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account"
        });
    });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
    //   const title = req.query.username;
    //   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Account.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving username."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Account.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Account with id=" + id
        });
    });
};


// Promote an account to admin by the username. 
// come back to this to check or admin.
exports.updateAddAdmin = (req, res) => {
    //const id = req.params.id; 
    const username = req.params.username;
    const senderUsername = req.params.senderUsername;
    // need to check if sender is username. do the endpoint after this? 
    if (username == null) {
        res.send({
            status: 500,
            message: `username is null`
        });
    }

    // returns an object on successful return 
    //  first element is always the number of affected rows
    //  second element is the actual affected rows (only supported in postgres with options.returning true.)
    Account.update({
        isAdmin: 1
    }, {
        where: {
            username: username
        }
    })
    .then(result => {
        if (result == 1) {
            res.send({
                status: 200,
                message: "Account was updated successfully."
            });
        } else {
            res.send({
                status: 500,
                message: `Cannot update Account to admin with username=${username}. This is probably due to the lack of access level to promote.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Account to admin with username=" + id
        });
    });
};

// Delete an account with the specified username in the request
exports.delete = (req, res) => {
    //   const id = req.params.id;
    const username = req.params.username;
    Account.destroy({
        where: {
            username: username
        }
    })
    .then(result => {
        if (result == 1) {
            res.send({
                status: 200,
                message: "Account deleted successfully"
            });
        } else {
            res.send({
                status: 500,
                message: `Cannot delete Account with username=${username}. Account not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not Account with username=" + username
        });
    });
};

// Delete all accounts from the database.
exports.deleteAll = (req, res) => {
    Account.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Account were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
        });
    });
};

// find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };