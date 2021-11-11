module.exports = app => {
    ROUTE_PATH = "/api/course"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const course = require("../../controllers/course.controller");

    router.post("/",course.createCourse);

    // router.post('/all',course.findAll)

    router.post("/alladmin", course.getCourses);

    // router.get("/allid", course.findAllId);

    router.post("/allidtitle", course.findAllIdTitle);

    // router.get("/", course.findOne);

    router.post("/find",course.getCoursePackage);

    router.post("/delete",course.deleteCourse)

    router.post('/update', course.updateCourse)

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}