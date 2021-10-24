// CONTRIBUTOR: John Cheong
'use strict';

const request = require('supertest'); 
const app = require('../../server.js');
const assert = require('assert')

const dummy_reload = require("../../app/dummy/reload")

describe('The courses route and controller',()=>{
  before(function(done){
      dummy_reload.reload().then(() => { done() })
  })

  it('creates one course through post request with courseId',(done)=>{
    request(app).post('/api/course').send({courseId: 5, title: 'Biology', description:"Course on Biology"}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.description === "Course on Biology")
        assert(response.body.courseId === 5)
        assert(response.body.title == 'Biology')
        done()
      }
    )
  })

  it('creates one course through post request without courseId',(done)=>{
    request(app).post('/api/course').send({title: 'Organic Chemistry', description:"Course on Organic Chemistry"}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.description === "Course on Organic Chemistry")
        assert(response.body.title == 'Organic Chemistry')
        done()
      }
    )
  })

  it('retrieves one course through get request',(done)=>{
    request(app).get('/api/course/1').end(
      (err,response)=>{
        assert(response.body.title == 'Physics')
        done()
      }
    )
  })


  it('retrieves course 1 with prerequisites through get request',(done)=>{
    request(app).get('/api/course/find/1').end(
      (err,response)=>{
        assert(response.body.course.title == 'Physics')
        assert(response.body.course.description == 'This course is about Physics')
        assert(response.body.course.active == true)
        assert(response.body.course.CoursePrerequisites.length == 1)
        assert(response.body.course.CoursePrerequisites[0].setNumber == 1)
        assert(response.body.course.CoursePrerequisites[0].courseId == 1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets.length == 3)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[0].setNumber==1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[0].course_fk==2)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[1].setNumber==1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[1].course_fk==3)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[2].setNumber==1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[2].course_fk==4)
        done()
      }
    )
  })

  it('retrieves all courses through get request', (done)=>{
    request(app).get('/api/course').end(
    (err,response)=>{
      // console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==6)
      done()
    }
    )
  })
})

