// CONTRIBUTOR: Asher Leong

module.exports = app => {
    ROUTE_PATH = "/api/forum"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const post = require("../../controllers/forum.controller");

    router.get("/getThread/:threadId", post.getThread);
    router.get("/getAllThreads", post.getAllThreads);
    router.get("/getAllUnansweredThreads", post.getAllUnansweredThreads);
    router.post("/createThread", post.createThread);
    router.post("/checkOwnership", post.checkOwnership);
    router.post("/updateThread", post.updateThread);
    router.post("/createAnswer", post.createAnswer);
    router.post("/updatePost", post.updatePost);
    router.post("/deletePost", post.deletePost);

    router.post("/addComment", post.addComment);
    router.post("/updateComment", post.updateComment);
    router.post("/deleteComment", post.deleteComment);

    //router.get("/:id", quiz.findOne);

    //======== END: CONTROLLER LOGIC ========

    app.use(ROUTE_PATH, router);
}