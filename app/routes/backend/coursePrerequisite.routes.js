module.exports = app => {
    ROUTE_PATH = "/api/courseprereq"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const coursePrequisite = require("../../controllers/coursePrerequisite.controller");

    router.post("/delete",coursePrequisite.deleteBySetNumberCourseFK)


    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}