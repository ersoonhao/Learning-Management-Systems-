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

    it('Fails to create a course Instance because course object is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.createCourse(null, c.title,c.description,c.active);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to create a course Instance because course title is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.createCourse(c, null,c.description,c.active);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to create a course Instance because course description is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.createCourse(c, c.title,null,c.active);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to create a course Instance because course activity is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.createCourse(c, c.title,c.description,null);
        
        assert(result == null);
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

    it('Fails to update a course Instance because course object not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.updateCourse(null, 'Chemistry','A course on chemistry',false);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to update a course Instance because course title is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.updateCourse(c, null,'A course on chemistry',false);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to update a course Instance because course description is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.updateCourse(c, 'Chemistry',null,false);
        
        assert(result == null);
        console.log(result)
    })

    it('Fails to update a course Instance because course activity is not present', ()=>{
        const c = Object.assign({}, course);
            
        const result = Course.updateCourse(null, 'Chemistry','A course on chemistry',null);
        
        assert(result == null);
        console.log(result)
    })
})
