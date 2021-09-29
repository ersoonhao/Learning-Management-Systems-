module.exports = app => {
    const questionOptions = require("../controllers/questionOption.controller");

    var router = require("express").Router();

    router.post("/",questionOptions.create);

    router.get("/", questionOptions.findAll);

    router.get("/:id", questionOptions.findOne);

    app.use('/api/questionOptions', router)
}