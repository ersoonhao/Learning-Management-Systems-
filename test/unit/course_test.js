// CONTRIBUTOR: John Cheong

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
        
        assert(result != 'Physics');
        console.log(result)
    })


})

describe('Course Update', ()=>{
    before(function(){
        course = {
            courseId: null,
            title: "Physics",
            description: "A course on Physics",
            active: false
        }
    });

    it('Update a course Instance', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.updateCourse(c, 'Chemistry','A course on chemistry',false);
        
        assert(result.title == 'Chemistry');
        console.log(result)
    })
})
