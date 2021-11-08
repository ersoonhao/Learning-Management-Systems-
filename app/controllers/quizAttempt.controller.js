const { Quiz, Question, QuestionOption, Enrollment, Course, Class, Section, QuizAttempt, QuestionAttempt } = require("../models");
const AccountController = require("./account.controller");

//Used internally
function isLearnerOfCourse(res, session, courseId) {
    return new Promise((resolve, _) => {
        Enrollment.findOne({
            where: { isEnrolled: true, accountId: session.accountId },
            include: [{ 
                model: Class, include: [{
                    model: Course, where: { courseId: courseId }
                }]
            }]
        }).then(enrollment => {
            if(!enrollment){
                res.status(400).send({ message: "Not a learner of course" })
            }
            resolve(enrollment)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
function isLearnerOfSection(res, session, sectionId) {
    return new Promise((resolve, _) => {
        Enrollment.findOne({
            where: { isEnrolled: true, accountId: session.accountId },
            include: [{ 
                model: Class, include: [{
                    model: Section, where: { sectionId: sectionId }
                }]
            }]
        }).then(enrollment => {
            if(!enrollment){
                res.status(400).send({ message: "Not a learner of class" })
            }
            resolve(enrollment)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
function isLearnerForQuiz(res, session, quizId) {
    return new Promise((resolve, _) => {
        Quiz.findOne({
            where: { quizId: quizId }
        }).then(quiz => {
            if(!quiz){
                res.status(400).send({ message: "Quiz not found" })
                return
            }
            if(quiz.type == Quiz.QUIZ_TYPES_GRADED){
                if(!quiz.courseId){
                    res.status(400).send({ message: "Quiz courseId not found" })
                    return
                }
                isLearnerOfCourse(res, session, quiz.sectionId).then(enrollment => {
                    resolve({
                        enrollment: enrollment,
                        quiz: quiz
                    })
                })
            }else if(quiz.type == Quiz.QUIZ_TYPES_UNGRADED){
                if(!quiz.sectionId){
                    res.status(400).send({ message: "Quiz sectionId not found" })
                    return
                }
                isLearnerOfSection(res, session, quiz.sectionId).then(enrollment => {
                    resolve({
                        enrollment: enrollment,
                        quiz: quiz
                    })
                })
            }
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        })
    })
}

//==== POST: /quizAttempt/getMyQuizAttempts
exports.getMyQuizAttempts = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizId = body.quizId; //For specific quiz
            
            console.log(req.body);
            if(!quizId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            
            //TODO: Check if learner is enrolled & has completed previous sections
            isLearnerForQuiz(res, session, quizId).then(pkg => {
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
                        res.send({ "quizAttempt": data });
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
    > localhost:8081/api/quiz/getMyQuizAttempts
        {
            "quizId": 1,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}

//==== POST: /quizAttempt/getMyQuestionAttempt
exports.getMyQuizAttempts = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if(session){
            let body = req.body;
            let quizAttemptId = body.quizAttemptId; //For specific quiz
            
            console.log(req.body);
            if(!quizAttemptId){
                res.status(400).send({
                    message: "Invalid data format"
                })
                return
            }
            
            QuestionAttempt.findAll({
                where: { questionAttemptId: questionAttemptId },
                include: [{ 
                    model: QuizAttempt, include: [{
                        model: Enrollment, where: { accountId: accountId }
                    }]
                }]
            }).then(data => {
                res.send({ "questionAttempt": data });
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
            "quizId": 1,
            "session": {
                "username": "george",
                "sessionId": "csnm2"
            }
        }
    */
}