module.exports = app => {
    const course = require("../../controllers/course.controller");

    var router = require("express").Router();

    router.post("/",course.create);

    router.get("/", course.findAll);

    router.get("/:id", course.findOne);

    app.use('/api/course', router)
}