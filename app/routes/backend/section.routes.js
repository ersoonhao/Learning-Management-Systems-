module.exports = app => {
    ROUTE_PATH = "/api/section"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const section = require("../../controllers/section.controller");

    
    router.get("/allsections", section.findAllSection);
    router.get("/section/:id", section.getSectionPackage);
    router.get("/:id", section.findOne);

    router.post("/",section.createSection);
    router.post("/delete",section.deleteSection);
    router.post('/update', section.updateSection);
    router.post("/deleteall",section.deleteAllSection);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}