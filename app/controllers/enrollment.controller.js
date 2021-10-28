const { Enrollment, Class, Account } = require('../models')
const AccountController = require('./account.controller')
const PrerequisiteSet = require('./prerequisiteSet.controller')

//==== POST: /isEligibleForCourse
exports.isEligibleForCourse = (req, res) => {
  return PrerequisiteSet.findAllByCourseFK(req, res)
  console.log(data)
  res.status(200).send(true)

  /* SAMPLE JSON BODY REQUEST
      {
          "course_fk": 1,
          "accountId": 1,
      }
  */
}

//==== POST: /findEnrollmentbyId
exports.findEnrollmentbyId = (req, res) => {
  const body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }
  const enrollmentId = body.enrollmentId

  Enrollment.findOne({
    where: { enrollmentId: enrollmentId },
    include: [{ model: Class }]
  })
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured obtaining data'
      })
    })
}

//==== POST: /getMyEnrolledClasses
exports.getMyEnrolledClasses = (req, res) => {
  const body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }

  const accountId = body.accountID
  let stmt

  if (body.type == 'ongoing') {
    stmt = { accountId: accountId, coursePassed: null, isWithdrawn: false }
  } else if (body.type == 'passed') {
    stmt = { accountId: accountId, coursePassed: true }
  } else if (body.type == 'failed') {
    stmt = { accountId: accountId, coursePassed: true }
  } else if (body.type == 'withdrawn') {
    stmt = { accountId: accountId, isWithdrawn: true }
  } else {
    stmt = { accountId: accountId }
  }

  Enrollment.findAll({
    where: stmt,
    include: [{ model: Class }]
  })
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured obtaining data'
      })
    })

  /* SAMPLE JSON BODY REQUEST
        {      
            "accountId": 1
        }
    */
}

//==== POST: /getAllClassEnrollments
exports.getAllClassEnrollments = (req, res) => {
  const body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }

  const classId = body.classId

  Enrollment.findAll({
    where: { classId: classId },
    include: [{ model: Account }]
  })
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured obtaining data'
      })
    })

  /* SAMPLE JSON BODY REQUEST
        {      
            "classId": 1
        }
    */
}

//==== Get: /getAllPendingEnrollments
exports.getAllPendingEnrollments = (req, res) => {
  Enrollment.findAll({
    where: { enrolledDate: null },
    include: [{ model: Account }]
  })
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured obtaining data'
      })
    })
}

//==== POST: /applyCourseClass
exports.applyCourseClass = (req, res) => {
  let body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }

  //Access control
  //TODO: Get permissions
  const enrollment = Enrollment.createEnrollment(
    body.enrollment,
    body.accountId,
    body.classId
  )

  if (enrollment == null) {
    res.status(400).send({
      message: 'Invalid data format'
    })
    return
  }

  //Write to DB
  Enrollment.create(enrollment)
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured during creation'
      })
    })

  /* SAMPLE JSON BODY REQUEST
        {      
            "enrollment": {
                "isSelfEnrollment": true,
            },
            "accountId": 1,
            "classId": 1
        }
    */
}

//==== POST: /enrollLearner
exports.enrollLearner = (req, res) => {
  const permissions = [AccountController.PERM_ADMIN]
  AccountController.validAuthNAccess(req, res, permissions).then(session => {
    //Access control
    if (session) {
      let body = req.body
      if (session.isAdmin) {
        _createEnrollment(body, res) //CREATE enrollment
      }
    } else {
      res.status(500).send({ message: 'Invalid session' })
      return
    }
  })
  /* SAMPLE JSON BODY REQUEST
      {
          "enrollment": {
            "isSelfEnrollment": false
          }, 
          "courseId": 1,
          "accountId": 1,
          "session": {
              "username": "robin",
              "sessionId": "0q8l8"
          }
      }
  */
}

//==== POST: /applyCourseClass
function _createEnrollment (body, res) {
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }

  //Access control
  //TODO: Get permissions
  const enrollment = Enrollment.createEnrollment(
    body.enrollment,
    body.accountId,
    body.classId
  )

  if (enrollment == null) {
    res.status(400).send({
      message: 'Invalid data format'
    })
    return
  }

  if (!enrollment.isSelfEnrollment) {
    date = new Date()
    enrollment.enrolledDate = date.toISOString()
    enrollment.isEnrolled = true
  }

  //Write to DB
  Enrollment.create(enrollment)
    .then(data => {
      res.send({ enrollment: data })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured during creation'
      })
    })

  /* SAMPLE JSON BODY REQUEST
        {      
            "enrollment": {
                "isSelfEnrollment": true,
            },
            "accountId": 1,
            "classId": 1
        }
    */
}

//==== POST: /respondApplication
exports.respondApplication = (req, res) => {
  const permissions = [AccountController.PERM_ADMIN]
  AccountController.validAuthNAccess(req, res, permissions).then(session => {
    //Access control
    if (session) {
      let body = req.body
      if (session.isAdmin) {
        _updateEnrollment(body, res) //CREATE enrollment
      }
    } else {
      res.status(500).send({ message: 'Invalid session' })
      return
    }
  })
  /* SAMPLE JSON BODY REQUEST
      {
          "enrollmentId": 1,
          "isApproved": true,
          "session": true
              "username": "robin",
              "sessionId": "0q8l8"
          }
      }
  */
}

//==== POST: /applyCourseClass
function _updateEnrollment (body, res) {
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }

  date = new Date()
  enrolledDate = date.toISOString()
  enrollmentId = body.enrollmentId

  if (body.isApproved) {
    stmt = { enrolledDate: enrolledDate, isEnrolled: true }
  } else {
    stmt = { isEnrolled: false }
  }

  Enrollment.update(stmt, {
    where: { enrollmentId: enrollmentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Successfully updated.'
        })
      } else {
        res.send({
          message: `Cannot update with id=${enrollmentId}.`
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: 'Error updating with id=' + enrollmentId
      })
    })
}

//==== POST: /deleteEnrollment
exports.deleteEnrollment = (req, res) => {
  const enrollmentId = req.body.enrollmentId

  Enrollment.destroy({
    where: { enrollmentId: enrollmentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Course was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Enrollment with id=${enrollmentId}. Maybe Enrollment was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Enrollment with id=' + enrollmentId
      })
    })

  /* SAMPLE JSON BODY REQUEST
        {      
            "enrollmentId": 1,
        }
    */
}
