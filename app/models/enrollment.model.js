// CONTRIBUTOR: Asher Leong
const vld = require('./validator')

module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define('enrollment', {
    enrollmentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    isSelfEnrollment: {
      type: Sequelize.BOOLEAN
    },

    isEnrolled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    dateCreated: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },

    enrolledDate: {
      type: Sequelize.DATEONLY,
      defaultValue: null
    },

    coursePassed: {
      type: Sequelize.BOOLEAN,
      defaultValue: null
    },

    isWithdrawn: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    accountId: {
      type: Sequelize.INTEGER
    },

    classId: {
      type: Sequelize.INTEGER //id of poster
    }
  })

  //Public
  Enrollment.createEnrollment = function (enrollment, accountId, classId) {
    if (enrollment == null || accountId == null || classId == null) {
      return null
    }
    delete enrollment.accountId
    delete enrollment.classId

    enrollment.accountId = accountId
    enrollment.classId = classId

    if (isValidEnrollment(enrollment, true)) {
      return enrollment
    }
    return null
  }

  Enrollment.updateEnrollment = function (enrollment) {
    if (enrollment == null) {
      return null
    }

    if (isValidPost(enrollment, false)) {
      return enrollment
    }
    return null
  }

  //Private
  function isValidEnrollment (enrollment, isNew) {
    if (
      (isNew && enrollment.isSelfEnrollment == null) ||
      (isNew && enrollment.accountId == null) ||
      (isNew && enrollment.classId == null)
    ) {
      console.log('Post Error: 1')
      return false
    }

    if (
      !(
        vld.validType(enrollment.enrollmentId, 'number') &&
        vld.validType(enrollment.isSelfEnrollment, 'boolean') &&
        vld.validType(enrollment.enrolledDate, 'string') &&
        vld.validType(enrollment.isWithdrawn, 'boolean') &&
        vld.validType(enrollment.accountId, 'number') &&
        vld.validType(enrollment.classId, 'number')
      )
    ) {
      console.log('Post Error: 2')
      return false
    }
    return true
  }
  return Enrollment
}
