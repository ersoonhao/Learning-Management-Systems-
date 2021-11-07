module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("Course", {
        courseId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type:Sequelize.STRING(256)
        },
        description:{
            type:Sequelize.STRING(500)
        },
        active:{
            type: Sequelize.BOOLEAN
        },
        courseImage:{
            type: Sequelize.STRING(2083)
        }
    });

    //Public
    Course.createCourse = function (course, title, description, active) {
        if(course == null){
            return null;
        }

        if(title == null){
            return null;
        }

        if(description == null){
            return null;
        }

        if(active == null){
            return null;
        }

        delete course.title;
        delete course.description
        delete course.active

        course.title = title
        course.description = description
        course.active = active

        if(isValidCourse(course, true)){
            return course;
        }
        return null;
    }

    Course.updateCourse = function (course, title, description, active) {
        if(course == null){
            return null;
        }

        if(title == null){
            return null;
        }

        if(description == null){
            return null;
        }

        if(active == null){
            return null;
        }

        delete course.title;
        delete course.description
        delete course.active

        course.title = title
        course.description = description
        course.active = active

        if(isValidCourse(course, true)){
            return course;
        }
        return null;
    }

    //Private
    function isValidCourse(course, isNew){

        if(!course){
            console.log("course Error: No course provided")
        }

        if(!isNew){
            console.log("course Error: Not a new course");
            return false;
        }

        if(isNew && course.courseId){
            console.log("course Error: Course ID Present");
            return false;
        }

        if(isNew && course.title == null){
            console.log("course Error: No course title");
            return false;
        }

        if(isNew && course.description == null){
            console.log("course Error: No course description");
            return false;
        }

        if(isNew && course.active == null){
            console.log("course Error: No course active type provided");
            return false;
        }

        return true;
    }

    return Course; 
};
  