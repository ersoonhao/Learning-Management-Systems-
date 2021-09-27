const db = require("../models");

// need to create an account table
const Accounts = db.Account; // must declare this in index.js of model
const Op = db.Sequelize.Op;

// helper function to hash. Not used yet.Use if required.
async function hash(password) {
    return await bcrypt.hash(password, 10);
}

// Create and Save a new account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const account = {
    username: req.body.username,
    email: req.body.description,
    password: req.body.password,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false, // if empty will be false.
    isTrainer: req.body.isTrainer ? req.body.isTrainer : false,
    isLearner: req.body.isLearner ? req.body.isLearner : false,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated
  };

  // Save Tutorial in the database
  Accounts.create(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account"
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
//   const title = req.query.username;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Accounts.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving username."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Accounts.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Account with id=" + id
      });
    });
};


// Promote an account to admin by the username. 
// come back to this to check or admin.
exports.updateAddAdmin = (req, res) => {
//   const id = req.params.id; 
  const username= req.params.username; 
  const senderUsername=req.params.senderUsername;
  // need to check if sender is username. do the endpoint after this? 
  if (username == null){
    res.send({
        status: 401, 
        message: `username is null`
      });
  }

  // returns an object on successful return 
  //  first element is always the number of affected rows
  //  second element is the actual affected rows (only supported in postgres with options.returning true.)
  Accounts.update({isAdmin: 1}, {
    where: { username:username }
  })
    .then(result => {
      if (result == 1) {  
        res.send({
            status: 200,
            message: "Account was updated successfully."
        });
      } else {
        res.send({
          status: 401, 
          message: `Cannot update Account to admin with username=${username}. This is probably due to the lack of access level to promote.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Account to admin with username=" + id
      });
    });
};

// Delete an account with the specified username in the request
exports.delete = (req, res) => {
//   const id = req.params.id;
  const username= req.params.username; 
  Accounts.destroy({
    where: { username: username }
  })
    .then(result => { 
      if (result == 1) {
        res.send({
          status: 200,  
          message: "Accounts deleted successfully"
        });
      } else {
        res.send({
          status: 401,  
          message: `Cannot delete Account with username=${username}. Account not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not Account with username=" + username
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Accounts.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Accounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
