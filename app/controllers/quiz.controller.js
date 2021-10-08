const { Quiz, Question, QuestionOption } = require("../models");

//==== POST: /getQuizPackage
exports.getQuizPackage = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    
    let quizId = body.quizId;
    if(quizId == null){
        res.status(400).send({
            message: "Invalid data format"
        })
        return
    }

    //Get quiz data
    Quiz.findOne({
        where: { quizId: quizId },
        include: [ { model: Question, include: [QuestionOption] } ]
    }).then(data => {
        res.send({ "quiz": data });
    });
}

//==== POST: /createQuiz
exports.createQuiz = (req,res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

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
            message:
            err.message || "Some error occured while creating"
        })
    })
    
    /* SAMPLE JSON BODY REQUEST
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
            "sectionId": null
        }
    */
}

//==== POST: /updateQuiz
exports.updateQuiz = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init quiz
    const quiz = Quiz.updateQuiz(body.quiz);
    if(quiz == null){
        res.status(400).send({
            message: "Invalid quiz data format"
        })
        return
    }
    console.log(`Updating: ${quiz}`)
    
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
        console.log(err);
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });

    /* SAMPLE JSON BODY REQUEST
        {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 0.7,
                "active": false
            }
        }
    */
}

//=== POST: /addQuestion
exports.addQuestion = (req,res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init
    const question = Question.createQuestion(body.question, body.quizId);
    if(question == null){
        res.status(400).send({
            message: "Invalid data format"
        })
        return
    }

    //Write to DB
    Question.create(question).then(data => {
        res.send({ "question": data })

    }).catch(err=>{
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occured while creating"
        })
    })

    /* SAMPLE JSON BODY REQUEST
        {
            "question": {
                "questionId": null,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }, 
            "quizId": 1
        }
    */
}
//==== POST: /updateQuestion
exports.updateQuestion = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init
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
        console.log(err);
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });

    /* SAMPLE JSON BODY REQUEST
        {
            "question": {
                "questionId": 1,
                "question": "TEST",
                "autoGraded": true,
                "type": "MCQ"
            }
        }
    */
}
//==== POST: /deleteQuestion
exports.deleteQuestion = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    
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
    /* SAMPLE JSON BODY REQUEST
        {
            "questionId": 1
        }
    */
};

//=== POST: /addQuestionOption
exports.addQuestionOption = (req,res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init
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
        console.log(err);
        res.status(500).send({
            message:
            err.message || "Some error occured while creating"
        })
    })

    /* SAMPLE JSON BODY REQUEST
        {
            "questionOption": {
                "questionOptionId": null,
                "optionText": "TEST",
                "isCorrect": true
            },
            "questionId": 1
        }
    */
}
//==== POST: /updateQuestionOption
exports.updateQuestionOption = (req, res) => {
    let body = req.body;
    if(!body){
        console.log(err);
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init
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
        console.log(err);
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });

    /* SAMPLE JSON BODY REQUEST
        {
            "questionOption": {
                "questionOptionId": 1,
                "optionText": "TEST",
                "isCorrect": true
            }
        }
    */
}
//==== POST: /deleteQuestionOption
exports.deleteQuestionOption = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    
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
        console.log(err);

        res.status(500).send({
            message: "Could not delete with id=" + id
        });
    });
    /* SAMPLE JSON BODY REQUEST
        {
            "questionOptionId": 1
        }
    */
};


