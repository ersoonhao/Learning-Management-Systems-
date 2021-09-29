module.exports = app => {
    const quizzes = require("../controllers/quiz.controller");

    var router = require("express").Router();

    router.post("/",quizzes.create);

    router.get("/", quizzes.findAll);

    router.get("/:id", quizzes.findOne);

    app.use('/api/quizzes', router)
}