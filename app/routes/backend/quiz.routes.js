// CONTRIBUTOR: Robin Chong

module.exports = app => {
    ROUTE_PATH = "/api/quiz"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const quiz = require("../../controllers/quiz.controller");

    router.post("/getQuizPackage", quiz.getQuizPackage);

    router.post("/createQuiz", quiz.createQuiz);
    router.post("/updateQuiz", quiz.updateQuiz);
    
    router.post("/addQuestion", quiz.addQuestion);
    router.post("/updateQuestion", quiz.updateQuestion);
    router.post("/deleteQuestion", quiz.deleteQuestion);

    router.post("/addQuestionOption", quiz.addQuestionOption);
    router.post("/updateQuestionOption", quiz.updateQuestionOption);
    router.post("/setQuestionOptionAnswer", quiz.setQuestionOptionAnswer);
    router.post("/deleteQuestionOption", quiz.deleteQuestionOption);
    
    //router.get("/:id", quiz.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}