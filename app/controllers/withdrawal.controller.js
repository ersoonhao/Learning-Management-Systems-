const db = require("../models");
const {Enrollment, Class, Course, sequelize} = require("../models");
const AccountController = require("./account.controller");
const Op = db.Sequelize.Op;
const Enrollment = db.Enrollment;
const NOW = new Date();
// const sequelize = db.sequelize;

// Learner Self-Withdrawal --> PUT
exports.withdraw = (req,res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        if (session) {
            let body = req.body
            if(!body) {
                res.status(400).send({
                    message: 'Request body cannot be empty!'
                })
                return
            }

            const enrollmentId = req.body.enrollmentId;
            const isWithdrawn = req.body.isWithdrawn;

            // Basically NOW must be before selfEnrollEndDateTime to self-withdraw
            Enrollment.update({isWithdrawn: true},{
                where: { enrollmentId = enrollmentId},
                include: {
                    model: Class,
                    where: 
                    {
                        NOW: {
                            [Op.lt]: sequelize.col('selfEnrollEndDateTime')
                        }
                    }
                }
            }).then(num => {
                if (num == 1){
                    res.send({
                        message: "You have withdrawn successfully"
                    });
                } else{
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
        };
    )};
};

// HR Withdrawal
exports.HRWithdraw = (req,res) => {
    const permissions = [AccountController.PERM_ADMIN]
    // only HR can withdraw here
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        if (session) {

            const enrollmentId = req.body.enrollmentId;
            const isWithdrawn = req.body.isWithdrawn;

            Enrollment.update({isWithdrawn: true},{
                where: { enrollmentId = enrollmentId}
            })
            .then(num => {
                if (num == 1){
                    res.send({
                        message: "You have withdrawn the student successfully"
                    });
                } else{
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

            };
            )};
        };