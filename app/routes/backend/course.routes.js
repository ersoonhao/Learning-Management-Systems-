module.exports = app => {
    ROUTE_PATH = "/api/course"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const course = require("../../controllers/course.controller");

    router.post("/",course.create);

    router.post('/all',course.findAll)

    router.post("/alladmin", course.findAllPostAdmin);

    router.get("/allid", course.findAllId);

    router.get("/allidtitle", course.findAllIdTitle);

    router.get("/", course.findOne);

    router.post("/find",course.findOneCourse);

    router.post("/delete",course.delete)


    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}