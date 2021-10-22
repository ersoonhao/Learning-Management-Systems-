module.exports = app => {
    ROUTE_PATH = "/api/message"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const message = require("../../controllers/message.controller");

    router.post("/create",message.create);

    router.get("/all", message.findAll);

    router.post("/", message.findAllById);

    router.post("/pair",message.findAllBySenderReceiverId)

    router.post("/delete",message.delete)

    router.get("/:id", message.findOne);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
}