const db = require("../models");

// need to create an account table
const Accounts = db.Accounts; // must declare this in index.js of model
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
// half done  
exports.updateAddAdmin = (req, res) => {
//   const id = req.params.id; 
  const username= req.params.username; 

  Accounts.update({isAdmin: 1}, {
    where: { username:username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
