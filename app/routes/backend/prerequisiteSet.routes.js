module.exports = app => {
    ROUTE_PATH = "/api/prereqset"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const prerequisiteSet = require("../../controllers/prerequisiteSet.controller");

    router.get("/all", prerequisiteSet.findAll);

    router.post("/course_fk", prerequisiteSet.findAllByCourseFK)

    router.post("/setnumber", prerequisiteSet.findAllBySetNumber)

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}