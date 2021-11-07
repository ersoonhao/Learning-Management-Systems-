module.exports = app => {

    ROUTE_PATH = "/api/withdrawal"
    var router = require("express").Router();

    const withdrawal = require("../../controllers/withdrawal.controller.js");

    //Learner self-withdrawal
    router.put("/SelfWithdraw", withdrawal.withdraw);

    //HR Withdraw
    router.put("/HRWithdraw", withdrawal.HRWithdraw);

    app.use(ROUTE_PATH, router);
};