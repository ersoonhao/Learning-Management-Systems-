// CONTRIBUTOR: Robin Chong

module.exports = app => {
    ROUTE_PATH = "/api/quizAttempt"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const quizAttempt = require("../../controllers/quizAttempt.controller");

    router.post("/getMyQuizAttempts", quizAttempt.getMyQuizAttempts);

    router.post("/getMyQuestionAttempts", quizAttempt.getMyQuestionAttempts);
    
    router.post("/startQuizAttempt", quizAttempt.startQuizAttempt);

    router.post("/registerQuestionAttempt", quizAttempt.registerQuestionAttempt);
    
    router.post("/submitQuizAttempt", quizAttempt.submitQuizAttempt);
    
    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}