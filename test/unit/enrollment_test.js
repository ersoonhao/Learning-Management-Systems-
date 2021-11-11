// CONTRIBUTOR: Asher Leong

const assert = require('assert')
const { Enrollment } = require('../../app/models')

describe('Enrollment Creation', () => {
    before(function() {
        accountId = 8;
        classId = 4;
        enrollment = {
            isSelfEnrollment: true
        }
    })

    it('Create a enrollment Instance', () => {
        const e = Object.assign({}, enrollment)

        const result = Enrollment.createEnrollment(e, accountId, classId)

        assert(result != null)
        console.log(result)
    })

    it('Fails to create an enrollment Instance because enrollment object is not present', () => {
        const e = Object.assign({}, enrollment)

        const result = Enrollment.createEnrollment(null, accountId, classId)

        assert(result == null)
        console.log(result)
    })

    it('Fails to create a enrollment Instance because accountId is not present', () => {
        const e = Object.assign({}, enrollment)

        const result = Enrollment.createEnrollment(e, null, classId)

        assert(result == null)
        console.log(result)
    })

    it('Fails to create a enrollment Instance because classId is not present', () => {
        const e = Object.assign({}, enrollment)

        const result = Enrollment.createEnrollment(e, accountId, null)

        assert(result == null)
        console.log(result)
    })

})

describe('Enrollment Update', () => {
    before(function() {
        enrollment = {
            enrollmentId: 4,
            isSelfEnrollment: true
        }
    })

    it('Update an enrollment Instance', () => {
        const e = Object.assign({}, enrollment)

        const result = Enrollment.updateEnrollment(e)
        assert(result != null)
        console.log(result)
    })

    it('Fails to update a course Instance because enrollementId not present', () => {
        enrollment.enrollmentId = null
        const e = Object.assign({}, enrollment)
        const result = Enrollment.updateEnrollment(e)
        assert(result == null)
        console.log(result)
    })

})