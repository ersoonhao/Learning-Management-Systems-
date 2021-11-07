const db = require("../models");
const {
    Enrollment,
    Class,
    Course,
    sequelize
} = require("../models");
const AccountController = require("./account.controller");
const Op = db.Sequelize.Op;
const NOW = new Date();
// const sequelize = db.sequelize;

exports.withdraw = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body cannot be empty!'
                })
                return
            }
            const enrollmentId = req.body.enrollmentId;
            // const isWithdrawn = req.body.isWithdrawn;
            // Basically NOW must be before selfEnrollEndDateTime to self-withdraw
            Enrollment.update({
                    isWithdrawn: true
                }, {
                    where: {
                        enrollmentId: enrollmentId,
                        accountId: session.accountId
                        //whoever logging in has the same accountId as the enrollmentId
                    },
                    include: {
                        model: Class,
                        where: {
                            NOW: {
                                [Op.lt]: sequelize.col('selfEnrollEndDateTime')
                            }
                        }
                    }
                }).then(num => {
                    if (num == 1) {
                        res.send({
                            message: "You have withdrawn successfully"
                        });
                    } else {
                        res.send({
                            message: `Cannot update the withdrawal with enrollmentId=${enrollmentId}.`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error withdraw with enrollmentId = " + enrollmentId
                    });
                });



        }
    })
}

exports.HRWithdraw = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {
            const enrollmentId = req.body.enrollmentId;
            const isWithdrawn = req.body.isWithdrawn;

            Enrollment.update({
                    isWithdrawn: true
                }, {
                    where: {
                        enrollmentId: enrollmentId
                    }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "You have withdrawn the student successfully"
                        });
                    } else {
                        res.send({
                            message: `Cannot withdraw enrollmentId=${enrollmentId}.`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error withdrawing with enrollmentId = " + enrollmentId
                    });
                });
        }
    })
}