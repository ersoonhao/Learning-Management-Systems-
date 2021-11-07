// // CONTRIBUTOR: John Cheong
'use strict';

const request = require('supertest'); 
const app = require('../../server.js');
const assert = require('assert')

const dummy_reload = require("../../app/dummy/reload")

describe('The course prerequisites route and controller',()=>{
  // before(function(done){
  //     dummy_reload.reload().then(() => { done() })
  // })
  before(function(done){
      dummy_reload.reload().then(() => { done() })
  })

  it('deletes one prerequisite set through post request', (done)=>{
    request(app).post('/api/courseprereq/delete').send({session: dummy_reload.SESSION_ADMIN_TRAINER,"courseId":1, "setNumber":2}).end(
    (err,response)=>{
      console.log(response.body)
      assert.equal(response.body.message,"set was deleted successfully!")
      done()
    
    }
    )
  })


})

