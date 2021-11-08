// CONTRIBUTOR: Robin Chong

module.exports = app => {
    ROUTE_PATH = "/api/quizAttempt"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const quizAttempt = require("../../controllers/quizAttempt.controller");

    router.post("/getMyQuizAttempts", quizAttempt.getMyQuizAttempts);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}