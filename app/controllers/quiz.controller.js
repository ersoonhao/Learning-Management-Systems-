const { Quiz, Question, QuestionOption, Class } = require("../models");
const AccountController = require("./account.controller");
const debug = true;
const CourseAccessController = require("./courseAccess.controller");

//==== POST: /getQuizPackage
exports.getQuizPackage = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizId = body.quizId; //For specific quiz
            let courseId = body.courseId; //For graded quiz
            let sectionId = body.sectionId; //For ungraded quiz
            
            console.log(req.body);
            if(!quizId && !courseId && !sectionId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            if(session.isAdmin){
                //Admin
                _getQuizPackage(res, quizId, courseId, sectionId)
            }else if(session.isTrainer){
                //Trainer
                if(quizId){
                    CourseAccessController.isTrainerForQuiz(res, session, quizId).then(pkg => { //Ensure is trainer for quiz
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }else if(courseId){
                    CourseAccessController.isTrainerForCourse(res, session, courseId).then(pkg => { //Ensure is trainer for quiz
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }else if(sectionId){
                    CourseAccessController.isTrainerForSection(res, session, sectionId).then(pkg => { //Ensure is trainer for quiz
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }
            }else{
                //TODO: Check if learner has completed previous sections
                if(quizId){
                    CourseAccessController.isLearnerForQuiz(res, session, quizId).then(pkg => { //Ensure is learner for quiz 
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }else if(courseId){
                    CourseAccessController.isLearnerForCourse(res, session, courseId).then(pkg => { //Ensure is learner for quiz 
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }else if(sectionId){
                    CourseAccessController.isLearnerForSection(res, session, sectionId).then(pkg => { //Ensure is learner for quiz 
                        if(pkg){
                            _getQuizPackage(res, quizId, courseId, sectionId)
                        }
                    })
                }
            }
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/getQuizPackage
        {
            "quizId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
function _getQuizPackage(res, quizId, courseId, sectionId){
    //Get quiz data
    let q;
    if(quizId){
        q = { quizId: quizId }
    }else if(courseId){
        q = { courseId: courseId, type: Quiz.QUIZ_TYPES_GRADED }
    }else if(sectionId){
        q = { sectionId: sectionId, type: Quiz.QUIZ_TYPES_UNGRADED }
    }
    console.log(q);
    Quiz.findOne({
        where: q,
        include: [ { model: Question, include: [QuestionOption] } ]
    }).then(data => {
        res.send({ "quiz": data });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred obtaining data"
        })
    });
}


//==== POST: /createQuiz
exports.createQuiz = (req,res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            if(body.courseId && body.quiz.type == Quiz.QUIZ_TYPES_GRADED){ //Graded Quiz
                if(session.isAdmin){
                    //Admin
                    _createQuiz(body, res); //CREATE quiz
                    
                }else if(session.isTrainer){
                    //Trainer
                    CourseAccessController.isTrainerForCourse(res, session, body.courseId).then(pkg => { //Ensure is trainer for course
                        if(pkg){
                            _createQuiz(body, res); //CREATE quiz
                        }
                    })
                }else{
                    res.status(500).send({ message: "Invalid session" })
                    return
                }
            }else if(body.sectionId && body.quiz.type == Quiz.QUIZ_TYPES_UNGRADED){ //Ungraded Quiz
                if(session.isAdmin){
                    //Admin
                    _createQuiz(body, res); //CREATE quiz 
                    
                }else if(session.isTrainer){
                    //Trainer
                    CourseAccessController.isTrainerForSection(res, session, body.sectionId).then(pkg => { //Ensure is trainer for section
                        if(pkg){
                            _createQuiz(body, res); //CREATE quiz 
                        }
                    })
                }
            }else{
                res.status(400).send({
                    message: "Invalid data format!"
                })
                return
            }
            
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/createQuiz
        {
            "quiz": {
                "quizId": null,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 0.7,
                "active": false
            }, 
            "courseId": 1,
            "sectionId": null,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}

function _createQuiz(body, res){
    //Init quiz
    const quiz = Quiz.createQuiz(body.quiz, body.courseId, body.sectionId);
    if(quiz == null){
        res.status(400).send({
            message: "Invalid data format"
        })
        return
    }
    //Write to DB
    Quiz.create(quiz).then(data => {
        res.send({"quiz": data})
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while creating"
        })
    })
}

//==== POST: /updateQuiz
exports.updateQuiz = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init quiz
            let body = req.body;
            const quiz = Quiz.updateQuiz(body.quiz);
            if(quiz == null){
                res.status(400).send({
                    message: "Invalid quiz data format"
                })
                return
            }
            console.log(`Updating: ${quiz}`)
            
            if(session.isAdmin){
                //Admin
                _updateQuiz(res, quiz)

            }else if(session.isTrainer){
                //Trainer
                CourseAccessController.isTrainerForQuiz(res, session, quiz.quizId).then(pkg => { //Ensure is trainer for quiz
                    if(pkg){
                        _updateQuiz(res, quiz)
                    }
                })
            }
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/updateQuiz
        {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 0.7,
                "active": false
            },
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
function _updateQuiz(res, quiz){
    //Update DB
    let id = quiz.quizId;

    Quiz.update(quiz, {
        where: { quizId: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Successfully updated."
            });
        } else {
            res.send({
                message: `Cannot update with id=${id}.`
            });
        }
    }).catch(err => {
        if (debug) { console.log(err) }
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });
}

//=== POST: /addQuestion
exports.addQuestion = (req,res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init
            let body = req.body;
            const question = Question.createQuestion(body.question, body.quizId);
            if(question == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            if(session.isAdmin){
                //Admin
                _addQuestion(res, question)

            }else if(session.isTrainer){
                //Trainer
                CourseAccessController.isTrainerForQuiz(res, session, body.quizId).then(pkg => { //Ensure is trainer for quiz
                    if(pkg){
                        _addQuestion(res, question)
                    }
                })
            }
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/addQuestion
        {
            "question": {
                "questionId": null,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }, 
            "quizId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
function _addQuestion(res, question){
    //Write to DB
    Question.create(question).then(data => {
        res.send({ "question": data })

    }).catch(err=>{
        if (debug) { console.log(err) }
        res.status(500).send({
            message: err.message || "Some error occured while creating"
        })
    })
}

//==== POST: /updateQuestion
exports.updateQuestion = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init
            let body = req.body;
            const question = Question.updateQuestion(body.question);
            if(question == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            console.log(`Updating: ${question}`)
            
            //Update DB
            let id = question.questionId;

            Question.update(question, {
                where: { questionId: id }
            }).then(num => {
                if (num == 1) {
                    res.send({
                        message: "Successfully updated."
                    });
                } else {
                    res.send({
                        message: `Cannot update with id=${id}.`
                    });
                }
            }).catch(err => {
                if (debug) { console.log(err) }
                res.status(500).send({
                    message: "Error updating with id=" + id
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/updateQuestion
        {
            "question": {
                "questionId": 1,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            },
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
//==== POST: /deleteQuestion
exports.deleteQuestion = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let id = body.questionId;
            if(id == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }

            Question.destroy({
                where: { questionId: id }
            
            }).then(num => {
                if (num == 1) {
                        res.send({
                            message: "Deleted successfully!"
                        });
                    } else {
                        res.send({
                            message: `id=${id} has already been deleted.`
                        });
                    }
            }).catch(err => {
                res.status(500).send({
                    message: "Could not delete with id=" + id
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/deleteQuestion
        {
            "questionId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
};

//=== POST: /addQuestionOption
exports.addQuestionOption = (req,res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init
            let body = req.body;
            const questionOption = QuestionOption.createQuestionOption(body.questionOption, body.questionId);
            if(questionOption == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }

            //Write to DB
            QuestionOption.create(questionOption).then(data => {
                res.send({ "questionOption": data })

            }).catch(err=>{
                if (debug) { console.log(err) }
                res.status(500).send({
                    message:
                    err.message || "Some error occured while creating"
                })
            })
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/addQuestionOption
        {
            "questionOption": {
                "questionOptionId": null,
                "optionText": "TEST",
                "isCorrect": true
            },
            "questionId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
//==== POST: /updateQuestionOption
exports.updateQuestionOption = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init
            let body = req.body;
            const questionOption = QuestionOption.updateQuestionOption(body.questionOption);
            if(questionOption == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            console.log(`Updating: ${questionOption}`)
            
            //Update DB
            let id = questionOption.questionOptionId;

            QuestionOption.update(questionOption, {
                where: { questionOptionId: id }
            }).then(num => {
                if (num == 1) {
                    res.send({
                        message: "Successfully updated."
                    });
                } else {
                    res.send({
                        message: `Cannot update with id=${id}.`
                    });
                }
            }).catch(err => {
                if (debug) { console.log(err) }
                res.status(500).send({
                    message: "Error updating with id=" + id
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/updateQuestionOption
        {
            "questionOption": {
                "questionOptionId": 1,
                "optionText": "TEST",
                "isCorrect": true
            },
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
//==== POST: /setQuestionOptionAnswer
exports.setQuestionOptionAnswer = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            //Init
            let questionId = req.body.questionId;
            let questionOptionId = req.body.questionOptionId;
            
            if(!questionId || !questionOptionId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            
            //Update DB
            QuestionOption.update({ isCorrect: false }, { //Reset
                where: { questionId: questionId }
            }).then(num => {
                QuestionOption.update({ isCorrect: true }, { //Set ans
                    where: { questionOptionId: questionOptionId }
                }).then(num => {
                    if (num == 1) {
                        res.send({
                            message: "Successfully updated"
                        });
                    }else{
                        res.status(500).send({
                            message: "Unable to set as answer"
                        });
                    }
                }).catch(err => {
                    if (debug) { console.log(err) }
                    res.status(500).send({
                        message: "Error updating"
                    });
                });
            }).catch(err => {
                if (debug) { console.log(err) }
                res.status(500).send({
                    message: "Error updating"
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/setQuestionOptionAnswer
        {
            "questionId": 1,
            "questionOptionId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
}
//==== POST: /deleteQuestionOption
exports.deleteQuestionOption = (req, res) => {
    const permissions = [AccountController.PERM_ADMIN, AccountController.PERM_TRAINER]
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let id = body.questionOptionId;
            if(id == null){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }

            QuestionOption.destroy({
                where: { questionOptionId: id }
            
            }).then(num => {
                if (num == 1) {
                        res.send({
                            message: "Deleted successfully!"
                        });
                    } else {
                        res.send({
                            message: `id=${id} has already been deleted.`
                        });
                    }
            }).catch(err => {
                if (debug) { console.log(err) }
                res.status(500).send({
                    message: "Could not delete with id=" + id
                });
            });
        }
    })
    /* SAMPLE JSON BODY REQUEST
    > localhost:8081/api/quiz/deleteQuestionOption
        {
            "questionOptionId": 1,
            "session": {
                "username": "robin",
                "sessionId": "0q8l8"
            }
        }
    */
};


