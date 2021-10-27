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

    dateCreated: {
      type: Sequelize.DATE,
      defaultValue: null
    },

    enrollmentDate: {
      type: Sequelize.DATE,
      defaultValue: null
    },

    coursePassed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    isWithdrawn: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }

  })

  //Public
  Enrollment.enroll = function (enrollment) {
    if (isSelfEnrollment == null || enrollmentDate == null) {
      return null
    }
    delete enrollment.enrollmentId

    enrollment.enrollmentId = enrollmentId
    post.threadId = threadId

    if (isValidEnrollment(post, true)) {
      return post
    }
    return null
  }

  Enrollment.updateEnrollment = function (enrollment) {
    if (post == null) {
      return null
    }

    if (isValidPost(post, false)) {
      return post
    }
    return null
  }

  //Private
  function isValidEnrollment (enrollment, isNew) {
    if (
      (isNew && enrollment.isSelfEnrollment == null) ||
      (isNew && enrollment.enrollmentDate == null)
    ) {
      console.log('Post Error: 1')
      return false
    }

    if (
      !(
        vld.validType(enrollment.enrollmentId, 'number') &&
        vld.validType(enrollment.isSelfEnrollment, 'boolean') &&
        vld.validType(enrollment.dateCreated, 'datetime') && 
        vld.validType(enrollment.enrollmentDate, 'datetime') &&
        vld.validType(enrollment.coursePassed, 'boolean') &&
        vld.validType(enrollment.isWithdrawn, 'boolean')
      )
    ) {
      console.log('Post Error: 2')
      return false
    }
    return true
  }
  return Enrollment
}
