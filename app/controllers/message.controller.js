const db = require("../models");
const Message = db.Message;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }

    const message = {
      messageId: req.body.messageId,
        text: req.body.text, 
        senderAccountId: req.body.senderAccountId, 
        receiverAccountId: req.body.receiverAccountId
    }

    Message.create(message)
    .then(data=>{
        res.send(data) //change this to render
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the Message"
        })
    })
}

exports.delete = (req, res) => {
  const messageId = req.body.messageId;

  Message.destroy({
    where: { messageId: messageId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Message with id=${messageId}. Maybe Message was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message with id=" + messageId
      });
    });
};

exports.findAll = (req, res) => {

  Message.findAll({ where: {

  } })
    .then(data => {
      res.send(data); //change this to render
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });
};

exports.findAllById = (req, res) => {

    const senderAccountId = req.body.id;
    const receiverAccountId = req.body.id;
    
    Message.findAll({ where: {
      [Op.or]:[{senderAccountId : senderAccountId},
      {receiverAccountId : receiverAccountId}]
    } })
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Messages."
        });
      });
  };

  exports.findAllBySenderReceiverId = (req, res) => {

    const senderAccountId = req.body.senderAccountId;
    const receiverAccountId = req.body.receiverAccountId;
    
    Message.findAll({ where: {
      [Op.or]:[{senderAccountId : senderAccountId},
      {receiverAccountId : receiverAccountId}]
    } })
      .then(data => {
        res.send(data); //change this to render
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Messages."
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Message.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Message with id=" + id
        });
      });
  };