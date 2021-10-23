// create Class --> POST
// Update those attributes which HR is able to change --> PUT
// Get available classes --> GET

module.exports = app => {
    ROUTE_PATH = "/api/class"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const Class = require("../../controllers/class.controller.js");


    //Create Class
    router.post("/", Class.createClass);

    //Get available classes
    // router.get("/", Class.findAll);

    // Get available classes according to courseId
    router.get("/:courseId", Class.getCourseClasses);

    //Update ClassStartDateTime using classId
    router.put("/:classId", Class.updateClass);

    //Check if section trainer is true

    



    //======== END: CONTROLLER LOGIC ========

    app.use(ROUTE_PATH, router);
};