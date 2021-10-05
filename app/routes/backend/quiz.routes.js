module.exports = app => {
    ROUTE_PATH = "/api/quiz"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const quiz = require("../../controllers/quiz.controller");

    router.post("/CreateQuiz",quiz.createQuiz);

    router.post("/UpdateQuiz", quiz.updateQuiz);

    //router.get("/:id", quiz.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}