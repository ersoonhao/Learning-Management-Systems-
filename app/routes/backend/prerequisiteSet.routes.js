module.exports = app => {
    ROUTE_PATH = "/api/prereqset"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    // const prerequisiteSet = require("../../controllers/prerequisiteSet.controller");
    const course = require("../../controllers/course.controller");
    // router.get("/all", prerequisiteSet.findAll);

    // router.post("/course_fk", prerequisiteSet.findAllByCourseFK)

    // router.post("/setnumber", prerequisiteSet.findAllBySetNumber)

    router.post("/new",course.newPrerequisiteSetCoursePrereq)

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}