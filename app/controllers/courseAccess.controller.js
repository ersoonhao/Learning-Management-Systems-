const { Quiz, Enrollment, Course, Class, Section } = require("../models");

//Used internally
exports.isTrainerForCourse = (res, session, courseId) => {
    return new Promise((resolve, _) => {
        Class.findOne({
            where: { courseId: courseId, trnAccountId: session.accountId },
            include: [{ model: Course }]
        }).then(data => {
            if(!data){
                res.status(400).send({ message: "Not a trainer of course" })
                return
            }
            resolve(data)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isTrainerForClass = (res, session, classId) => {
    return new Promise((resolve, _) => {
        Class.findOne({
            where: { classId: classId, trnAccountId: session.accountId },
            include: [{ model: Course }]
        }).then(data => {
            if(!data){
                res.status(400).send({ message: "Not a trainer of class" })
                return
            }
            resolve(data)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isTrainerForSection = (res, session, sectionId) => {
    return new Promise((resolve, _) => {
        Class.findOne({
            where: { trnAccountId: session.accountId },
            include: [{ model: Section, where: { sectionId: sectionId } }]
        }).then(data => {
            if(!data){
                res.status(400).send({ message: "Not trainer for section" })
                return
            }
            resolve(data)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isTrainerForQuiz = (res, session, quizId) => {
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
                this.isTrainerForCourse(res, session, quiz.courseId).then(c => {
                    if(!c){
                        res.status(400).send({ message: "Not trainer for quiz" })
                        return
                    }
                    resolve({ //pkg
                        class: c,
                        quiz: quiz
                    })
                })
            }else if(quiz.type == Quiz.QUIZ_TYPES_UNGRADED){
                if(!quiz.sectionId){
                    res.status(400).send({ message: "Quiz sectionId not found" })
                    return
                }
                this.isTrainerForSection(res, session, quiz.sectionId).then(c => {
                    if(!c){
                        res.status(400).send({ message: "Not trainer for quiz" })
                        return
                    }
                    resolve({ //pkg
                        class: c,
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

//Learner
exports.isLearnerForCourse = (res, session, courseId) => {
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
                res.status(400).send({ message: "Not learner for course" })
                return
            }
            resolve(enrollment)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isLearnerForClass = (res, session, classId) => {
    return new Promise((resolve, _) => {
        Enrollment.findOne({
            where: { isEnrolled: true, accountId: session.accountId, classId: classId },
            include: [{ 
                model: Class, include: [{ model: Course }]
            }]
        }).then(enrollment => {
            if(!enrollment){
                res.status(400).send({ message: "Not learner for course" })
                return
            }
            resolve(enrollment)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isLearnerForSection = (res, session, sectionId) => {
    return new Promise((resolve, _) => {
        Enrollment.findOne({
            where: { isEnrolled: true, accountId: session.accountId },
            include: [{ 
                model: Class, include: [{
                    model: Section, where: { sectionId: sectionId }
                }, { model: Course }
                ]
            }]
        }).then(enrollment => {
            if(!enrollment){
                res.status(400).send({ message: "Not learner for class" })
                return
            }
            resolve(enrollment)
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred obtaining data"
            })
        });
    })
}
exports.isLearnerForQuiz = (res, session, quizId) => {
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
                this.isLearnerForCourse(res, session, quiz.courseId).then(enrollment => {
                    if(!enrollment){
                        res.status(400).send({ message: "Not learner for quiz" })
                        return
                    }
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
                this.isLearnerForSection(res, session, quiz.sectionId).then(enrollment => {
                    if(!enrollment){
                        res.status(400).send({ message: "Not learner for quiz" })
                        return
                    }
                    resolve({ //pkg
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