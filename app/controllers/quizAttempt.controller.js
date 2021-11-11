const { Question, QuestionOption, Enrollment, QuizAttempt, QuestionAttempt, sequelize } = require("../models");
const AccountController = require("./account.controller");
const CourseAccessController = require("./courseAccess.controller");

//==== POST: /quizAttempt/getMyQuizAttempts
exports.getMyQuizAttempts = (req, res) => {
    const permissions = []
    let body = req.body;
    console.log(body);
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizId = body.quizId;
            
            console.log(req.body);
            if(!quizId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            CourseAccessController.isLearnerForQuiz(res, session, quizId).then(pkg => {
                if(pkg){
                    console.log(`EnrollmentId: ${pkg.enrollment.enrollmentId}`);
                    console.log(`QuizId: ${quizId}`);
                    let enrollmentId = pkg.enrollment.enrollmentId;
                    if(!enrollmentId){
                        res.status(400).send({ message: "enrollmentId not found" })
                        return
                    } 
                    QuizAttempt.findAll({
                        where: { enrollmentId: enrollmentId, quizId: quizId },
                    }).then(data => {
                        res.send({ "quizAttempts": data });
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || "Some error occurred obtaining data"
                        })
                    });
                }
            })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quizAttempt/getMyQuizAttempts
        {
            "quizId": 1,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//==== POST: /quizAttempt/getMyQuestionAttempts
exports.getMyQuestionAttempts = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizAttemptId = body.quizAttemptId;
            
            console.log(req.body);
            if(!quizAttemptId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            
            QuestionAttempt.findAll({
                where: { quizAttemptId: quizAttemptId },
                include: [{ 
                    model: QuizAttempt, include: [{
                        model: Enrollment, where: { accountId: session.accountId }
                    }]
                }]
            }).then(data => {
                res.send({ "questionAttempts": data });
            }).catch(err=>{
                res.status(500).send({
                    message: err.message || "Some error occurred obtaining data"
                })
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/getMyQuizAttempts
        {
            "quizAttemptId": 1,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//==== POST: /quizAttempt/startQuizAttempt
exports.startQuizAttempt = (req, res) => {
    const permissions = []
    let body = req.body;
    console.log(body);
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizId = body.quizId;
            
            console.log(req.body);
            if(!quizId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            CourseAccessController.isLearnerForQuiz(res, session, quizId).then(pkg => { //Ensure learner is enrolled
                if(pkg){
                    console.log(`EnrollmentId: ${pkg.enrollment.enrollmentId}`);
                    console.log(`QuizId: ${quizId}`);
                    let enrollmentId = pkg.enrollment.enrollmentId;
                    if(!enrollmentId){
                        res.status(400).send({ message: "enrollmentId not found" })
                        return
                    } 
                    //Ensure there are no on-going attempts
                    QuizAttempt.findAll({
                        where: { enrollmentId: enrollmentId, quizId: quizId, endDateAttempt: null },
                    }).then(ogQA => {
                        if(ogQA && ogQA.length > 0){
                            res.send({"quizAttempt": ogQA[0]}) //Ongoing attempt
                            return
                        }
                        //Create Quiz Attempt
                        const quizAttempt = QuizAttempt.createQuizAttempt(quizId, enrollmentId)
                        if(!quizAttempt){
                            res.status(400).send({
                                message: "Unable to init quiz"
                            })
                            return
                        }
                        QuizAttempt.create(quizAttempt).then(data => {
                            res.send({"quizAttempt": data}) // New attempt
                        }).catch(err=>{
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating"
                            })
                        })
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || "Some error occurred obtaining data"
                        })
                    });
                }
            })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quizAttempt/startQuizAttempt
        {
            "quizId": 1,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//=== POST: /registerQuestionAttempt
exports.registerQuestionAttempt = (req,res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizAttemptId = body.quizAttemptId;
            let questionOptionId = body.questionOptionId;

            console.log(req.body);
            if(!quizAttemptId || !questionOptionId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            isQuizAttemptOwner(res, session, quizAttemptId).then(pkg => {
                if(pkg){
                    let quizId = pkg.quiz.quizId;
                    if(!quizId){
                        res.status(400).send({ message: "Unable to obtain quizId" })
                        return
                    }
                    //Get Question
                    Question.findOne({
                        include: [{ 
                            model: QuestionOption, where: { questionOptionId: questionOptionId }
                        }]
                    }).then(question => {
                        let questionId = question.questionId;
                        if(!questionId){
                            res.status(400).send({ message: "Unable to obtain question" })
                            return
                        }
                        let questionType = question.type;
                        if(questionType == Question.QUESTION_TYPES_MCQ){

                            //Remove past attempt
                            sequelize.query(rmAttemptQuery, { bind: { questionId: questionId }}).spread(function(results, metadata) {
                                //Create Question Attempt
                                const questionAttempt = QuestionAttempt.createQuestionAttempt(quizAttemptId, questionOptionId)
                                if(!questionAttempt){
                                    res.status(400).send({
                                        message: "Unable to init question attempt"
                                    })
                                    return
                                }
                                QuestionAttempt.create(questionAttempt).then(data => {
                                    res.send({"questionAttempt": data})
                                }).catch(err=>{
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while creating"
                                    })
                                })
                            }).catch(err => {
                                res.status(500).send({
                                    message: "Could not remove past question attempt"
                                });
                            });
                        }else{
                            res.status(400).send({ message: "Unknown question type" })
                            return
                        }
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || "Some error occurred obtaining data"
                        })
                    });
                }
            })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quizAttempt/registerQuestionAttempt
        {
            "quizAttemptId": 2, 
            "questionOptionId": 4,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//=== POST: /submitQuizAttempt
exports.submitQuizAttempt = (req,res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizAttemptId = body.quizAttemptId;

            console.log(req.body);
            if(!quizAttemptId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            QuizAttempt.findOne({ 
                where: { quizAttemptId: quizAttemptId, endDateAttempt: null }
            }).then(qa => {
                if(!qa){
                    res.status(400).send({ message: "Unable to obtain on-going quiz" })
                    return
                }
                isQuizAttemptOwner(res, session, quizAttemptId).then(pkg => { //Ensure is QuizAttempt Owner
                    if(pkg){
                        let quizId = pkg.quiz.quizId;
                        if(!quizId){
                            res.status(400).send({ message: "Unable to obtain quizId" })
                            return
                        }
                        //Mark QuestionAttempts
                        sequelize.query(markQnsQuery, { bind: { quizAttemptId: quizAttemptId }}).spread(function(results, metadata) {
                            //Get score
                            QuestionAttempt.findAll({
                                where: { quizAttemptId: quizAttemptId, isCorrect: true },
                            }).then(correctQuestions => {
                                let score = correctQuestions.length;
                                //End QuizAttempt
                                let quizAttempt = { score: score, endDateAttempt: new Date().toISOString() }
                                QuizAttempt.update(quizAttempt, {
                                    where: { quizAttemptId: quizAttemptId, endDateAttempt: null }
                                }).then(num => {
                                    if(num >= 1){
                                        res.send({"quizAttempt": quizAttempt})
                                    }else{
                                        res.status(500).send({
                                            message: "Unable to end quiz, perhaps it has already ended"
                                        });
                                    }
                                }).catch(err => {
                                    res.status(500).send({
                                        message: "Error ending quiz attempt"
                                    });
                                });
                            }).catch(err=>{
                                res.status(500).send({
                                    message: err.message || "Some error occured obtaining data"
                                })
                            });
                        }).catch(err => {
                            if (debug) { console.log(err) }
                            res.status(500).send({
                                message: "Error Marking questions"
                            });
                        });
                    }
                })
            }).catch(err => {
                if (debug) { console.log(err) }
                res.status(500).send({
                    message: "Error updating with id=" + id
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quizAttempt/submitQuizAttempt
        {
            "quizAttemptId": 2, 
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//Used internally
function isQuizAttemptOwner(res, session, quizAttemptId){
    return new Promise((resolve, _) => {
        QuizAttempt.findOne({
            where: { quizAttemptId: quizAttemptId },
        }).then(qa => {
            if(!qa){
                res.status(400).send({
                    message: "Invalid quiz attempt"
                })
                return
            }
            let quizId = qa.quizId
            CourseAccessController.isLearnerForQuiz(res, session, quizId).then(pkg => { //Ensure learner is enrolled
                if(pkg){
                    console.log(`EnrollmentId: ${pkg.enrollment.enrollmentId}`);
                    console.log(`QuizId: ${quizId}`);
                    let enrollmentId = pkg.enrollment.enrollmentId;
                    if(!enrollmentId){
                        res.status(400).send({ message: "enrollmentId not found" })
                        return
                    } 

                    //Ensure is owner of QuizAttempt & is an on-going quiz
                    QuizAttempt.findOne({
                        where: { quizAttemptId: quizAttemptId, enrollmentId: enrollmentId, endDateAttempt: null },
                    }).then(quizAttempt => {
                        if(!quizAttempt){
                            res.status(400).send({
                                message: "Unable to obtain your on-going quiz"
                            })
                            return
                        }
                        pkg.quizAttempt = quizAttempt; //pkg (+add quizAttempt)
                        resolve(pkg);
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || "Some error occurred obtaining data"
                        })
                    });
                }
            })
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}


let markQnsQuery = `
    UPDATE QuestionAttempts as qa INNER JOIN QuestionOptions as qo ON qa.questionOptionId = qo.questionOptionId
    SET qa.isCorrect = true WHERE qo.isCorrect = true AND qa.quizAttemptId = $quizAttemptId
`
let rmAttemptQuery = `
    DELETE qa FROM QuestionAttempts qa INNER JOIN QuestionOptions qo ON qa.questionOptionId = qo.questionOptionId WHERE qo.questionId = $questionId
`