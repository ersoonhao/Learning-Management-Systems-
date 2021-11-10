const { Quiz, Enrollment, Course, Class, Section } = require("../models");

//Used internally
exports.isLearnerOfCourse = (res, session, courseId) => {
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
exports.isLearnerOfClass = (res, session, classId) => {
    return new Promise((resolve, _) => {
        Enrollment.findOne({
            where: { isEnrolled: true, accountId: session.accountId, classId: classId },
            include: [{ 
                model: Class, include: [{ model: Course }]
            }]
        }).then(enrollment => {
            if(!enrollment){
                res.status(400).send({ message: "Not a learner of course" })
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
exports.isLearnerOfSection = (res, session, sectionId) => {
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
                this.isLearnerOfCourse(res, session, quiz.sectionId).then(enrollment => {
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
                this.isLearnerOfSection(res, session, quiz.sectionId).then(enrollment => {
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