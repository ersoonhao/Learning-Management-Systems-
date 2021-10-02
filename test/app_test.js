'use strict';

const request = require('supertest'); 
const test = require('unit.js');
const app = require('../server.js');
const assert = require('assert')
const db = require('../app/models/index');

describe('The express app',async()=>{

  it('handles a get request to /test',(done)=>{
    request(app).get('/test').end(
      (err,response)=>{
        console.log(response.body)
        assert(response.body.message == `Test working @ port 8081`)
        done()
      }
    )
  })
})

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
