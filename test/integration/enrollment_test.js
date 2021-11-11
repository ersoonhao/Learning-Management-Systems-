// CONTRIBUTOR: Asher Leong
'use strict';

const request = require('supertest');
const app = require('../../server.js');
const assert = require('assert')

const dummy_reload = require("../../app/dummy/reload")

describe('The enrollment route and controller', () => {
    before(function(done) {
        dummy_reload.reload().then(() => { done() })
    })

    it('get Enrollment by Id', (done) => {
        request(app).post('/api/enrollment/findEnrollmentbyId').send({ session: dummy_reload.SESSION_ADMIN, enrollmentId: 1 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.enrollment.isEnrolled === false)
                assert(response.body.enrollment.enrolledDate === null)
                assert(response.body.enrollment.coursePassed === false)
                assert(response.body.enrollment.isSelfEnrollment === true)
                assert(response.body.enrollment.Class.classId === 1)
                done()
            }
        )
    })

    it('isEligible for course by courseId (eligible)', (done) => {
        request(app).post('/api/enrollment/isEligibleForCourse').send({ session: dummy_reload.SESSION_LEARNER_ALT_1, courseId: 4 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.eligible === true)
                done()
            }
        )
    })

    it('isEligible for course by courseId (not eligible) ', (done) => {
        request(app).post('/api/enrollment/isEligibleForCourse').send({ session: dummy_reload.SESSION_LEARNER_ALT_1, courseId: 2 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.eligible === false)
                done()
            }
        )
    })

    it('get my enrolled classes', (done) => {
        request(app).post('/api/enrollment/getMyEnrolledClasses').send({ session: dummy_reload.SESSION_LEARNER_ALT_1 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.enrollment[0].Class.classId === 1)
                assert(response.body.enrollment[1].Class.classId === 2)
                done()
            }
        )
    })


    it('get my enrolled classes by course', (done) => {
        request(app).post('/api/enrollment/getMyEnrollmentByCourse').send({ session: dummy_reload.SESSION_LEARNER_ALT_1, courseId: 1 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.data.Classes[0].classId === 1)
                assert(response.body.data.Classes[0].enrollments[0].enrollmentId === 2)
                done()
            }
        )
    })

    it('get all class enrollments', (done) => {
        request(app).post('/api/enrollment/getAllClassEnrollments').send({ session: dummy_reload.SESSION_ADMIN, classId: 1 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.enrollment[0].enrollmentId === 2)
                assert(response.body.enrollment[1].enrollmentId === 3)
                assert(response.body.enrollment[2].enrollmentId === 1)
                done()
            }
        )
    })

    it('creates one self-enrollment through post request with classId', (done) => {
        request(app).post('/api/enrollment/applyCourseClass').send({ session: dummy_reload.SESSION_LEARNER_ALT_1, classId: 4 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.enrollment.isEnrolled === false)
                assert(response.body.enrollment.enrolledDate === null)
                assert(response.body.enrollment.coursePassed === null)
                assert(response.body.enrollment.isSelfEnrollment === true)
                done()
            }
        )
    })

    it('creates one HR enrollment through post request with classId', (done) => {
        request(app).post('/api/enrollment/enrollLearner').send({ session: dummy_reload.SESSION_ADMIN, enrollment: { isSelfEnrollment: false }, classId: 4, accountId: 7 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.enrollment.isEnrolled === true)
                assert(response.body.enrollment.enrolledDate != null)
                assert(response.body.enrollment.coursePassed === null)
                assert(response.body.enrollment.isSelfEnrollment === false)
                done()
            }
        )
    })

    it('creates one HR enrollment through post request with classId', (done) => {
        request(app).post('/api/enrollment/respondApplication').send({ session: dummy_reload.SESSION_ADMIN, enrollmentId: 1, isApproved: true }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.message === 'Successfully updated.')
                done()
            }
        )
    })

    it('creates one HR enrollment through post request with classId', (done) => {
        request(app).post('/api/enrollment/deleteEnrollment').send({ session: dummy_reload.SESSION_ADMIN, enrollmentId: 1 }).end(
            (err, response) => {
                console.log(response.body)
                assert(response.body.message === 'Enrollment was deleted successfully!')
                done()
            }
        )
    })

})