module.exports = app => {
    ROUTE_PATH = "/api/course"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const course = require("../../controllers/course.controller");

    router.post("/",course.create);

    router.get("/", course.findAll);

    router.get("/:id", course.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}