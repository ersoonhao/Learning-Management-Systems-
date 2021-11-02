// create Class --> POST
// Update those attributes which HR is able to change --> PUT
// Get available classes --> GET

module.exports = app => {
    ROUTE_PATH = "/api/class"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const Class = require("../../controllers/class.controller.js");

    router.post("/getCourseClasses", Class.getCourseClasses);
    router.post("/getCourseClass", Class.getCourseClass);
    
    router.post("/createClass", Class.createClass);

    router.post("/updateClass", Class.updateClass);

    //Get available classes
    // router.get("/", Class.findAll);

    // // Get available classes according to courseId
    // router.post("/:courseId", Class.getCourseClasses);

    // //Update ClassStartDateTime using classId
    // router.post("/:classId", Class.updateClass);

    //Check if section trainer is true


    //======== END: CONTROLLER LOGIC ========

    app.use(ROUTE_PATH, router);
};