module.exports = app => {
    const questions = require("../controllers/question.controller");

    var router = require("express").Router();

    // Retrieve all questions or retrieve based on quiz ID
    router.post("/",questions.create);

    router.get("/", questions.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", questions.findOne);

    app.use('/api/questions', router)
}