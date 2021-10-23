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

  it('creates one course through post request',(done)=>{
    request(app).post('/api/course').send({courseId: 5, title: 'Biology', description:"Course on Biology"}).end(
      (err,response)=>{
        assert(response.body.description === "Course on Biology")
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
      assert(response.body.length==5)
      done()
    }
    )
  })
})

