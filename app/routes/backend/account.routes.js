module.exports = app => {
    ROUTE_PATH = "/api/account"
    var router = require("express").Router();

    //======== START: CONTROLLER LOGIC ========
    const accounts = require("../../controllers/account.controller.js");
    
    //Login
    router.post("/login", accounts.login);

    //Create new account
    router.post("/create", accounts.create);

    //Retrieve all accounts
    router.get("/", accounts.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/:customerId", accounts.findOne);
  
    // Update a Customer with customerId
    // router.put("/accounts/:customerId", accounts.update);
  
    // Delete a Customer with customerId
    router.delete("/:customerId", accounts.delete);
  
    // Create a new Customer
    router.delete("/", accounts.deleteAll);

    //======== END: CONTROLLER LOGIC ========
    
    app.use(ROUTE_PATH, router);
  };