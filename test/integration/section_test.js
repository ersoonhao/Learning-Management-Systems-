// CONTRIBUTOR: Soon Hao
'use strict'

const request = require('supertest')
const app = require('../../server.js')
const assert = require('assert')

const dummy_reload = require('../../app/dummy/reload')

describe('The Section route and controller', () => {
    before(function(done) {
        dummy_reload.reload().then(() => {
            done()
        })
    })

    it('creates one section through post request with courseId', done => {
        request(app)
            .post('/api/section/createSection')
            .send({
                session: dummy_reload.SESSION_ADMIN,
                classId: 1,
                title: 'Test',
                subtitle: 'Test',
                ordering: 1
            })
            .end((err, response) => {
                console.log(response.body)
                assert(response.body.title === 'Test')
                done()
            })
    })

    it('find all section', done => {
        request(app)
            .get('/api/section/findAllSection')
            .send()
            .end((err, response) => {
                console.log(response.body)
                assert(response.body[0].sectionId === 1)
                assert(response.body[1].sectionId === 2)
                done()
            })
    })

    it('creates get Section package', done => {
        request(app)
            .post('/api/section/getSectionPackage')
            .send({
                session: dummy_reload.SESSION_ADMIN,
                classId: 1
            })
            .end((err, response) => {
                console.log(response.body)
                assert(response.body.sections[0].sectionId === 1)
                assert(response.body.sections[0].CourseMaterials[0].CourseMaterialId === 1)
                assert(response.body.sections[0].Quiz.quizId === 1)
                done()
            })
    })

    it('creates get Learner Section package', done => {
        request(app)
            .post('/api/section/getLearnersSectionPackage')
            .send({
                session: dummy_reload.SESSION_LEARNER_ALT_3,
                classId: 1
            })
            .end((err, response) => {
                console.log(response.body)
                assert(response.body.sections[0].sectionId === 1)
                assert(response.body.sections[0].CourseMaterials[0].CourseMaterialId === 1)
                assert(response.body.sections[0].Quiz.quizId === 1)
                done()
            })
    })
})