const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
// constructor - values can be left as null except email, password , title ,firstname , lastname , role, created isApproved
const Account = function (account) {
    this.email = account.email; // email or username as PK. 
    this.username= account.username; 
    this.password = account.password;
    this.title = account.title; // Mr or Miss 
    this.firstName = account.firstName; 
    this.lastName = account.lastName;
    this.isAdmin= account.isAdmin; //  HR 
    this.isLearner= account.isLearner; 
    this.isTrainer = account.isTrainer;
    // this.role = account.role;
    //this.acceptTerms = account.acceptTerms;
    // this.verificationToken = account.verificationToken;
    // this.verified = account.verified;
    // this.resetToken = account.reset.Token;
    // this.resetTokenExpires = account.resetTokenExpires;
    // this.passwordReset = account.passwordReset;
    // this.created = account.created;
    // this.isApproved= account.isApproved;
    // this.updated = account.updated;
};


// BASIC FUNCTIONAL REQUIREMENTS 
// CRUD - all & individual. Based on ID? Make sense? 
// HASHING OF PASSWORD 
// RESET PASSWORD 

// EMAILER FUNCTIONS  
// RESET PASSWORD 

// #JWT LAST 
// Authenticate 
// refresh token 
// revoke token 
// validate reset token  

// CREATE 
Account.create = (newAccount, result) => {
    sql.query("INSERT INTO accounts SET ?", newAccount, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", {
            id: res.insertId,
            ...newAccount
        });
        result(null, {
            id: res.insertId,
            ...newAccount
        });
    });
};
// soon hao 
// READ BY ID 
Account.findById = (accountId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${accountId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};

// READ BY EMAIL. Need this for cognito 
Account.findByEmail = (accountEmail, result) => {
    sql.query(`SELECT * FROM customers WHERE email = ${accountEmail}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the email
        result({
            kind: "not_found"
        }, null);
    });
};



Account.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
};

Account.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
        [customer.email, customer.name, customer.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({
                    kind: "not_found"
                }, null);
                return;
            }

            console.log("updated customer: ", {
                id: id,
                ...customer
            });
            result(null, {
                id: id,
                ...customer
            });
        }
    );
};

Account.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

Account.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = Account;