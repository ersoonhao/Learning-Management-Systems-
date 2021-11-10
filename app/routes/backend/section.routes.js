module.exports = app => {
    ROUTE_PATH = "/api/section"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const section = require("../../controllers/section.controller");

    router.get("/findOne/:id", section.findOne);
    router.get("/findAllSection", section.findAllSection); 

    router.post("/getSectionPackage", section.getSectionPackage); //
    router.post("/createSection", section.createSection);
    router.post("/deleteSection", section.deleteSection);
    router.post('/updateSection', section.updateSection);
    router.post("/deleteAllSection", section.deleteAllSection);

    //======== END: CONTROLLER LOGIC ========

    app.use(ROUTE_PATH, router);
}