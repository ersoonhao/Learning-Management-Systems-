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
    request(app).post('/api/course').send({session: dummy_reload.SESSION_ADMIN, courseId: 5, title: 'Biology', description:"Course on Biology", active: true}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.course_data.description === "Course on Biology")
        assert(response.body.course_data.courseId === 5)
        assert(response.body.course_data.active === true)
        assert(response.body.course_data.title == 'Biology')
        done()
      }
    )
  })

  it('creates one course through post request without courseId',(done)=>{
    request(app).post('/api/course').send({session: dummy_reload.SESSION_ADMIN, title: 'Organic Chemistry', description:"Course on Organic Chemistry", active:true}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.course_data.description === "Course on Organic Chemistry")
        assert(response.body.course_data.title == 'Organic Chemistry')
        assert(response.body.course_data.active === true)
        done()
      }
    )
  })

  it('creates one course through post request without courseId with prerequisite sets',(done)=>{
    request(app).post('/api/course').send({session: dummy_reload.SESSION_ADMIN, "title":"Econs","description":"Course on Econs", "active":true, "prerequisite":[[1,2],[3,4]]}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.course_data.description === "Course on Econs")
        assert(response.body.course_data.title == 'Econs')
        assert(response.body.course_data.active === true)
        assert(response.body.prerequisite_sets.length == 4)
        assert(response.body.course_sets.length == 2)
        done()
      }
    )
  })

  it('creates one course through post request with courseId with prerequisite sets',(done)=>{
    request(app).post('/api/course').send({session: dummy_reload.SESSION_ADMIN, "courseId":8,"title":"Econs","description":"Course on Econs", "active":true, "prerequisite":[[1,2],[3,4]]}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.course_data.courseId == 8)
        assert(response.body.course_data.description === "Course on Econs")
        assert(response.body.course_data.title == 'Econs')
        assert(response.body.course_data.active === true)
        assert(response.body.prerequisite_sets.length == 4)
        assert(response.body.course_sets.length == 2)
        done()
      }
    )
  })


  it('retrieves course 1 with prerequisites through get request',(done)=>{
    request(app).post('/api/course/find').send({session: dummy_reload.SESSION_ADMIN, 'id':1}).end(
      (err,response)=>{
        console.log(response.body.course)
        assert(response.body.course.title == 'Cyber Security')
        assert(response.body.course.description == 'This course is about cyber security')
        assert(response.body.course.active == true)
        assert(response.body.course.CoursePrerequisites.length == 2)
        assert(response.body.course.CoursePrerequisites[0].setNumber == 1)
        assert(response.body.course.CoursePrerequisites[0].courseId == 1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets.length == 2)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[0].setNumber==1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[0].course_fk==2)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[1].setNumber==1)
        assert(response.body.course.CoursePrerequisites[0].PrerequisiteSets[1].course_fk==4)
        done()
      }
    )
  })

  it('retrieves all courses through post request', (done)=>{
    request(app).post('/api/course/all').send({session: dummy_reload.SESSION_ADMIN}).end(
    (err,response)=>{
      // console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==8)
      done()
    }
    )
  })

  it('retrieves all course ids through get request', (done)=>{
    request(app).get('/api/course/allid').end(
    (err,response)=>{
      // console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==8)
      assert(response.body[0]==1)
      done()
    }
    )
  })

  it('retrieves all course ids and titles through get request', (done)=>{
    request(app).get('/api/course/allidtitle').end(
    (err,response)=>{
      // console.log(response.body)
      console.log(response.body)
      assert(response.body.length==8)
      assert(response.body[0]['courseId']==1)
      assert(response.body[0]['title']=='Cyber Security')
      done()
    }
    )
  })

  it('deletes one course through post request with courseId',(done)=>{
    request(app).post('/api/course/delete').send({session: dummy_reload.SESSION_ADMIN, "courseId":1}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.message == "Course was deleted successfully!")
        done()
      }
    )
  })

})

