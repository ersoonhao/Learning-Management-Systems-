// CONTRIBUTOR: JohnCheong

const assert = require('assert')
const { Course } = require("../../app/models");

describe('Course Creation', ()=>{
    before(function(){
        course = {
            courseId: null,
            title: "Physics",
            description: "A course on Physics",
            active: false
        }
    });

    it('Create a course Instance', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.createCourse(c, c.title,c.description,c.active);
        console.log(result)
        assert(result != null);
    })
})
