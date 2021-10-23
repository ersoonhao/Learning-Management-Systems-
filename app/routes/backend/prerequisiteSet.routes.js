module.exports = app => {
    ROUTE_PATH = "/api/prereqset"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const prerequisiteSet = require("../../controllers/prerequisiteSet.controller");

    router.get("/all", prerequisiteSet.findAll);

    router.post("/coursefk", prerequisiteSet.findAllByCourseFK)

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}