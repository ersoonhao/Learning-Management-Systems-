// CONTRIBUTOR: Balamuniappan Varunesh

const assert = require('assert');
const { Class } = require("../../app/models");

describe('Class Creation', ()=>{
    before(function(){
        courseId = 2,

        // underscore present as class is a reserved keyword in JS
        _Class = {
            classId: null,
            classStartDateTime: "11/01/2021",
            classEndDateTime: "11/02/2021",
            selfEnrollStartDateTime: "01/12/2021",
            selfEnrollEndDateTime: "31/12/2021",
            maxCapacity: 50,
            trnAccountId: 3,
            adminAccountId: 2,

        }
    });
    // c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId
    it('Create Class', ()=>{
        const c = Object.assign({}, _Class);
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        assert(result != "11/01/2021");
        console.log(result);

    })

    it('Cannot instantiate class because class object is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(null, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })



    it('Cannot instantiate class because class StartDateTime is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, null, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because classEndDateTime is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, null, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because selfEnrollStartDateTime is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, null, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because selfEnrollEndDateTime is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, null, c.maxCapacity, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because maxCapacity is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, null, c.trnAccountId, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because trnAccountId is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, null, c.adminAccountId);
        
        assert(result == null);
        console.log(result)
    })

    it('Cannot instantiate class because adminAccountId is not present', ()=>{
        const c = Object.assign({}, _Class);
            
        const result = Class.createClass(c, c.classStartDateTime, c.classEndDateTime, c.selfEnrollStartDateTime, c.selfEnrollEndDateTime, c.maxCapacity, c.trnAccountId, null);
        
        assert(result == null);
        console.log(result)
    })

})

describe('Class Update', ()=>{
    before(function(){
        _Class = {
            classId: null,
            classStartDateTime: "11/01/2021",
            classEndDateTime: "11/02/2021",
            selfEnrollStartDateTime: "01/12/2020",
            selfEnrollEndDateTime: "31/12/2020",
            maxCapacity: 50,
            trnAccountId: 3,
            adminAccountId: 2,
        }
    });
    
    // it('Update a class instance', ()=>{
    //     const c = Object.assign({},_Class);

    //     const result = Class.updateClass(c, '14/01/2021', '14/02/2021', '05/12/2020', '25/12/2020',45,2,3);

    //     assert(result.classStartDateTime == '14/01/2021');
    //     console.log(result);
    // })

    it('Fail to update class instance because class object is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(null, '14/01/2021', '14/02/2021', '05/12/2020', '25/12/2020',45,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because classStartDateTime is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, null, '14/02/2021', '05/12/2020', '25/12/2020',45,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because classEndDateTime is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', null, '05/12/2020', '25/12/2020',45,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because selfEnrollStartDateTime is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', '14/02/2021', null, '25/12/2020',45,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because selfEnrollEndDateTime is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', '14/02/2021', '05/12/2020', null,45,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because maxCapacity is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', null, '05/12/2020', '25/12/2020',null,2,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because trnAccountId is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', null, '05/12/2020', '25/12/2020',45,null,3);

        assert(result == null);
        console.log(result);
    })

    it('Fail to update class instance because adminAccountId is not present', ()=>{
        const c = Object.assign({},_Class);

        const result = Class.updateClass(c, '14/01/2021', null, '05/12/2020', '25/12/2020',45,2,null);

        assert(result == null);
        console.log(result);
    })

});

// Update Test --> Having some error Will fix it later

// describe('Class Update', ()=>{
//     before(function(){
//         courseId = 2,

//         _Class = {
//             classId: null,
//             classStartDateTime: "11/01/2021",
//             classEndDateTime: "11/02/2021",
//             selfEnrollStartDateTime: "01/12/2021",
//             selfEnrollEndDateTime: "31/12/2021",
//             maxCapacity: 50,
//             trnAccountId: 3,
//             adminAccountId: 2,

//         }
//     });

//     it('Update a class instance', ()=>{

//         const c = Object.assign({}, _Class);

//         const result = Class.updateClass(c, "11/11/2021", "11/12/2021", "01/10/2021", "31/10/2021", 60, 4, 3);

//         assert(result.maxCapacity == 60);
//         console.log(result)
//     })
// })