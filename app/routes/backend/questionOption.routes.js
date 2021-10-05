// CONTRIBUTOR: Robin Chong

module.exports = app => {
    ROUTE_PATH = "/api/questionOption"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const questionOptions = require("../../controllers/questionOption.controller");

    router.post("/",questionOptions.create);

    router.get("/", questionOptions.findAll);

    router.get("/:id", questionOptions.findOne);

    //======== END: CONTROLLER LOGIC ========

    app.use(ROUTE_PATH, router);
}