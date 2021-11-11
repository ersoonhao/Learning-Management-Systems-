module.exports = app => {
    ROUTE_PATH = "/api/courseprereq"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const course = require("../../controllers/course.controller");

    router.post("/delete",course.deleteBySetNumberCourseFK)


    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}