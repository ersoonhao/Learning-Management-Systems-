// CONTRIBUTOR: Asher Leong

module.exports = app => {
  ROUTE_PATH = '/api/enrollment'
  var router = require('express').Router()

  //======== START: CONTROLLER LOGIC ========
  const enrollment = require('../../controllers/enrollment.controller')

  router.post('/findEnrollmentbyId', enrollment.findEnrollmentbyId)
  router.post('/getMyEnrolledClasses', enrollment.getMyEnrolledClasses)
  router.post('/getAllClassEnrollments', enrollment.getAllClassEnrollments)
  router.get('/getAllPendingEnrollments', enrollment.getAllPendingEnrollments)
  router.post('/applyCourseClass', enrollment.applyCourseClass)
  router.post('/enrollLearner', enrollment.enrollLearner)
  router.post('/respondApplication', enrollment.respondApplication)
  router.post('/deleteEnrollment', enrollment.deleteEnrollment)

  //router.get("/:id", quiz.findOne);

  //======== END: CONTROLLER LOGIC ========

  app.use(ROUTE_PATH, router)
}
