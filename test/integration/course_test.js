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
    request(app).post('/api/course').send({courseId: 5, title: 'Biology', description:"Course on Biology", active: true}).end(
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
    request(app).post('/api/course').send({title: 'Organic Chemistry', description:"Course on Organic Chemistry", active:true}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.course_data.description === "Course on Organic Chemistry")
        assert(response.body.course_data.title == 'Organic Chemistry')
        assert(response.body.course_data.active === true)
        done()
      }
    )
  })

  it('creates one course through post request without courseId with prerequisite sets',(done)=>{
    request(app).post('/api/course').send({"title":"Econs","description":"Course on Econs", "active":true, "prerequisite":[[1,2],[3,4]]}).end(
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
    request(app).post('/api/course').send({"courseId":8,"title":"Econs","description":"Course on Econs", "active":true, "prerequisite":[[1,2],[3,4]]}).end(
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

  it('retrieves one course through get request',(done)=>{
    request(app).get('/api/course/1').end(
      (err,response)=>{
        assert(response.body.title == 'Physics')
        done()
      }
    )
  })

  it('retrieves all courses through get request', (done)=>{
    request(app).get('/api/course').end(
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

  it('deletes one course through post request with courseId',(done)=>{
    request(app).post('/api/course/delete').send({"courseId":1}).end(
      (err,response)=>{console.log(response.body)
        assert(response.body.message == "Course was deleted successfully!")
        done()
      }
    )
  })

})

