module.exports = app => {


    // ignore this first i am using cognito-express to verify tokens 
    // account routes. This is like writing a normal routing function except the logic is abstracted away
    const accounts = require("../controllers/accounts.controller.js");
    // const accounts = require("../controllers/accounts.controller");
    var router = require("express").Router();
    
    //Create new account
    router.post("/", accounts.create);

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

    app.use('/api/accounts', router);
  };