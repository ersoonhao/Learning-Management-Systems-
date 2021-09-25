module.exports = app => {


    // ignore this first i am using cognito-express to verify tokens 
    // account routes. This is like writing a normal routing function except the logic is abstracted away
    const accounts = require("../controllers/accounts.controller");

    // cognito initialization


    const AmazonCognitoIdentity= require('amazon-cognito-identity-js');
    const config = require('../config/cognito.config.json');

    // something wrong with the UserPoolId hmm

    // const poolData ={
    //     UserPoolId: config.AmazonCognitoIdentity.userPoolId,
    //     clientid: config.cognito.clientId
    // }; 
    
    // console.log(poolData);
 
//EBS ensures credentials are legitimate before communicating 
// this request Kaleido, EBS makes request(s) to suit Kaleido’s API 
// to create wallet and an instance of a minting contract

    // const userPool= new  AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    // Create a new Customer
    app.post("/accounts", accounts.create);
  
    // Retrieve all Customers
    app.get("/accounts", accounts.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/accounts/:customerId", accounts.findOne);
  
    // Update a Customer with customerId
    app.put("/accounts/:customerId", accounts.update);
  
    // Delete a Customer with customerId
    app.delete("/accounts/:customerId", accounts.delete);
  
    // Create a new Customer
    app.delete("/accounts", accounts.deleteAll);
  };