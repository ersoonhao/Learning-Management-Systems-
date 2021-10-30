module.exports = app => {
    ROUTE_PATH = "/api/course"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const course = require("../../controllers/course.controller");

    router.post("/",course.create);

    router.get('/',course.findAll)

    router.post("/all", course.findAllPost);

    router.get("/allid", course.findAllId);

    router.get("/allidtitle", course.findAllIdTitle);

    router.get("/:id", course.findOne);

    router.get("/find/:id",course.findOneCourse);

    router.post("/delete",course.delete)


    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}