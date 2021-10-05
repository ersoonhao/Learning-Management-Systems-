module.exports = app => {
    ROUTE_PATH = "/api/quiz"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const quizzes = require("../../controllers/quiz.controller");

    var router = require("express").Router();

    router.post("/",quizzes.create);

    router.get("/", quizzes.findAll);

    router.get("/:id", quizzes.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}