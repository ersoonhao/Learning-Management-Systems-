const Account = require("../models/account.model");
// var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL


// for understanding of why callback functions 
////https://techsparx.com/nodejs/learning/callback-programming.html 
//https://stackoverflow.com/questions/6953286/how-to-encrypt-data-that-needs-to-be-decrypted-in-node-js

// helper function 
async function hash(password) {
    return await bcrypt.hash(password, 10);
}



// Create and Save a new Account
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Account
    const account = new Account({
      email: req.body.email,
      password: req.body.password,
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      acceptTerms: req.body.acceptTerms,
      role: req.body.role,
    //   verificationToken: req.body.verificationToken,
    //   verified:req.body.verified,
    //   resetToken:req.body.resetToken,
    //   resetTokenExpires:req.body.resetTokenExpires,
    //   passwordReset:req.body.passwordReset,
      created:req.body.created,
      isApproved:req.body.isApproved
    //   updated:req.body.updated
    });
  
    // Save Account in the database
    Account.create(account, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Account."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Account.getAll((err, data) => {
        if (err) {
            // internal server error 
            res.status(500).send({
                message: err.message || "Error occured while retrieving customers"
            });
        } else {
            res.send(data);
        }
    })
};

// Find a single Account with a customerId
exports.findOne = (req, res) => {
    Account.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Account not found with id ${req.params.customerId}`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving account ID ${req.params.customerId}`
                })
            }
        } else {
            // 
            console.log(data);
            res.send(data);

        }
    });

};

// Update a Account identified by the customerId in the request
exports.update = (req, res) => {
    // validate request. 
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Params vs Body 
    // params is for routes parameters 
    // app.put('/api/todos/:_id', ...)
    // req.body is for key value pairs of data submitted in the request body. populated by body-parsing middleware such as body-parser

    Account.updateById(req.params.customerId, new Account(req.body), (err, data) => {
        if (err) {
            if (err.kind = "not_found") {
                // maybe should use .json?? mm 
                res.status(404).send({
                    message: `Account not found with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating account with id ${req.params.customerId}.`
                });
            }
        } else {
            res.send(send);
        }

    })

};

// Delete a Account with the specified customerId in the request
exports.delete = (req, res) => {
    Account.remove(req.params.customerId, (err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message: `Account not found with id ${req.params.customerId}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error deleting account with id ${req.params.customerId}.`
                });
            }
        }else{
            res.send({ message: `Account was deleted successfully!` });
        }
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Account.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });

};