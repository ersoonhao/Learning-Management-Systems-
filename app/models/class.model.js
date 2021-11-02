module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("Class", {
        classId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        classStartDateTime: {
            type:Sequelize.DATE
        },

        classEndDateTime:{
            type:Sequelize.DATE
        },

        selfEnrollStartDateTime:{
            type:Sequelize.DATE
        },

        selfEnrollEndDateTime:{
            type:Sequelize.DATE
        },

        maxCapacity:{
            type:Sequelize.INTEGER
        },

        courseId:{
            type:Sequelize.INTEGER
        },

        trnAccountId:{
            type:Sequelize.INTEGER
        },

        adminAccountId:{
            type:Sequelize.INTEGER
        }

    });

    Class.createClass = function(_Class, classStartDateTime, classEndDateTime, selfEnrollStartDateTime, selfEnrollEndDateTime, maxCapacity, courseId, trnAccountId, adminAccountId){

        if(_Class == null){
            return null;
        }

        if(classStartDateTime == null){
            return null;
        }

        if(classEndDateTime == null){
            return null;
        }

        if(selfEnrollStartDateTime == null){
            return null;
        }

        if(selfEnrollEndDateTime == null){
            return null;
        }

        if(maxCapacity == null){
            return null;
        }

        if(courseId == null){
            return null;
        }

        if(trnAccountId == null){
            return null;
        }

        if(adminAccountId == null){
            return null;
        }

        delete _Class.classStartDateTime;
        delete _Class.classEndDateTime;
        delete _Class.selfEnrollStartDateTime;
        delete _Class.selfEnrollEndDateTime;
        delete _Class.maxCapacity;
        delete _Class.courseId;
        delete _Class.trnAccountId;
        delete _Class.adminAccountId;

        _Class.classStartDateTime = classStartDateTime;
        _Class.classEndDateTime = classEndDateTime;
        _Class.selfEnrollStartDateTime = selfEnrollStartDateTime;
        _Class.selfEnrollEndDateTime = selfEnrollEndDateTime;
        _Class.maxCapacity = maxCapacity;
        _Class.courseId = courseId;
        _Class.trnAccountId = trnAccountId;
        _Class.adminAccountId = adminAccountId;

        if(isValidClass(_Class, true)){
            return _Class;
        }
        return null;
    }

    Class.updateClass = function(_Class, classStartDateTime, classEndDateTime, selfEnrollStartDateTime, selfEnrollEndDateTime, maxCapacity, courseId, trnAccountId, adminAccountId){

        if(_Class == null){
            return null;
        }

        if(classStartDateTime == null){
            return null;
        }

        if(classEndDateTime == null){
            return null;
        }

        if(selfEnrollStartDateTime == null){
            return null;
        }

        if(selfEnrollEndDateTime == null){
            return null;
        }

        if(maxCapacity == null){
            return null;
        }

        if(courseId == null){
            return null;
        }

        if(trnAccountId == null){
            return null;
        }

        if(adminAccountId == null){
            return null;
        }

        delete _Class.classStartDateTime;
        delete _Class.classEndDateTime;
        delete _Class.selfEnrollStartDateTime;
        delete _Class.selfEnrollEndDateTime;
        delete _Class.maxCapacity;
        delete _Class.courseId;
        delete _Class.trnAccountId;
        delete _Class.adminAccountId;

        _Class.classStartDateTime = classStartDateTime;
        _Class.classEndDateTime = classEndDateTime;
        _Class.selfEnrollStartDateTime = selfEnrollStartDateTime;
        _Class.selfEnrollEndDateTime = selfEnrollEndDateTime;
        _Class.maxCapacity = maxCapacity;
        _Class.courseId = courseId;
        _Class.trnAccountId = trnAccountId;
        _Class.adminAccountId = adminAccountId;

        if(isValidClass(_Class, true)){
            return _Class;
        }
        return null;
    }

    // var isNewClass = true;
    function isValidClass(_Class, isNewClass){

        if(!_Class){
            console.log("No Class Provided");
        }

        if(!isNewClass){
            console.log("Class already Exists!");
            return false;
        }

        if(isNewClass && _Class.classStartDateTime == null){
            console.log("No ClassStartDateTime!");
            return false;
        }

        if(isNewClass && _Class.classEndDateTime == null){
            console.log("No classEndDateTime!");
            return false;
        }

        if(isNewClass && _Class.selfEnrollStartDateTime == null){
            console.log("No selfEnrollStartDateTime!");
            return false;
        }

        if(isNewClass && _Class.selfEnrollEndDateTime == null){
            console.log("No selfEnrollEndDateTime!");
            return false;
        }

        if(isNewClass && _Class.maxCapacity == null){
            console.log("No maxCapacity!");
            return false;
        }

        if(isNewClass && _Class.courseId == null){
            console.log("No courseId!");
            return false;
        }

        if(isNewClass && _Class.trnAccountId == null){
            console.log("No trnAccountId!");
            return false;
        }

        if(isNewClass && _Class.adminAccountId == null){
            console.log("No adminAccountId!");
            return false;
        }
        return true;
    }

    return Class;
};
