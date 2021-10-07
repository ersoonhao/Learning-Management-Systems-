'use strict';

const request = require('supertest'); 
const test = require('unit.js');
const app = require('../server.js');
const assert = require('assert')
const db = require('../app/models');
const { Course } = require("../app/models");


let initial_courses = [
  {title: 'Physics',description:'This course is about Physics', active:true},
  {title: 'Biology',description:'This course is about Biology', active:true},
  {title: 'Chemistry',description: 'This course is about Chemistry', active: false},
  {title: 'Mathematics',description: 'This course is about Mathematics', active: true}
]

async function createCourseData(){
  await db.sequelize.sync({ force: true }).then(() => {

    for(var j=0; j<initial_courses.length;j++){
      Course.create(initial_courses[j])
    }
  
    console.log("Drop and re-sync db.");
});
}

describe('The courses route and controller',()=>{

    // before(async function(){
    //   console.log('before all tests')
    //   // await createCourseData()
    //   db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    //   .then(function(){
    //       return db.sequelize.sync({ force: true }).then(
    //         () => {

    //           for(var j=0; j<initial_courses.length;j++){
    //             Course.create(initial_courses[j])
    //           }
            
    //           console.log("Drop and re-sync db.");
    //       }
    //       );
    //   })
    //   .then(function(){
    //       return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    //   })
    //   .then(function(){
    //       console.log('Database synchronised.');
    //   }, function(err){
    //       console.log(err);
    //   });
   
    // })

    before(
      async function(){
        createCourseData()
  
      }
    )
  
    after(
      async function(){
        db.sequelize.sync({ force: true }).then(() => { //Reset database
          // Init Dummy Data
          require("./app/dummy/course")
      });
  
      }
    )
  

  it('creates one course through post request',(done)=>{
    request(app).post('/api/course').send({title: 'Biology', description:"Course on Biology"}).end(
      (err,response)=>{
        assert(response.body.description === "Course on Biology")
        done()
      }
    )
  })

  it('retrieves one course through get request',(done)=>{
    request(app).get('/api/course/1').end(
      (err,response)=>{
        assert(response.body.title == 'Biology')
        done()
      }
    )
  })

  it('retrieves all courses through get request', (done)=>{

    request(app).get('/api/course').end(
    (err,response)=>{
      // console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==1)
      done()
    }
    )
  })

  // after(async function(){
  //   console.log('after all tests')
  //   // await createCourseData()

  //   db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  //   .then(function(){
  //       return db.sequelize.sync({ force: true }).then(
  //         () => {

  //           for(var j=0; j<initial_courses.length;j++){
  //             Course.create(initial_courses[j])
  //           }
          
  //           console.log("Drop and re-sync db.");
  //       }
  //       );
  //   })
  //   .then(function(){
  //       return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  //   })
  //   .then(function(){
  //       console.log('Database synchronised.');
  //   }, function(err){
  //       console.log(err);
  //   })
 
  // })

  

})

