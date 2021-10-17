const db = require("../models");

// need to create an account table
// const Section = db.Section; 
const Op = db.Sequelize.Op;
const { Section, CourseMaterial } = require("../models");
// helper function to hash. Not used yet.Use if required.
async function hash(password) {
    return await bcrypt.hash(password, 10);
}


// private functions 
function isSectionTrainer (Account, SectionId){
    // ??? 


    return true; 
}

// Q
// what is section package? 
// accounts for validation? 
// basic CRUD for section is done 

//to-do 
// get Section Package 
// isSectionTrainer private fucntion
// 



// Create and Save a Section 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.subtitle ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const section = {
    username: req.body.username,
    email: req.body.email,
    title: req.body.title,
    title: req.body.subtitle,
    order: req.body.order
  };
  console.log(section)
  
  Section.create(section)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Section"
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
//   const title = req.query.username;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Section.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving username."
      });
    });
};

// Find a single section with an id
exports.findOne = (req, res) => {
  const id = req.params.sectionId;

  Section.findByPk(id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Account with id=" + id
      });
    });
};




exports.delete = (req, res) => {
//   const id = req.params.id;
const id = req.params.sectionId;
  Section.destroy({
    where: { sectionId: id }
  })
    .then(result => { 
      if (result == 1) {
        res.send({
          status: 200,  
          message: `Section ${id} deleted successfully`
        });
      } else {
        res.send({
          status: 401,  
          message: `Cannot delete Section ${id}. Section not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Section" + id
      });
    });
};



// Update Section why need account?
// update based on req.body
// validation not done hence throw error if something goes wrong
exports.update = (req, res) => {
    const id = req.params.id;
    
    Section.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: `Section ${id} was updated successfully.`
          });
        } else {
          res.status(401).send({
            message: `Cannot update Section ${id}. Section was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Section with id=" + id
        });
      });
  };



// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Section.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Section were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


