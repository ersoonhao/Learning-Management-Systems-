module.exports = app => {
    ROUTE_PATH = "/api/question"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const questions = require("../../controllers/question.controller");

    // Retrieve all questions or retrieve based on quiz ID
    router.post("/",questions.create);

    router.get("/", questions.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", questions.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}