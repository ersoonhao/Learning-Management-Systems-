const db = require("../models");
const Message = db.Message;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

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

exports.update = (req, res) => {
  const messageId = req.body.messageId;
  const text = req.body.text;

  Message.update({text: text}, {
    where: { messageId: messageId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Message with messageId=${messageId}. Maybe Message was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Message with messageId=" + messageId
      });
    });
};

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

  exports.findAllByUsername = (req, res) => {

    const senderUsername = req.body.username;
    const receiverUsername = req.body.username;
    
    Message.findAll({ where: {
      [Op.or]:[{senderUsername : senderUsername},
      {receiverUsername : receiverUsername}]
    } })
      .then(data => {
        
        var messages = {}

        for(var i=0; i<data.length; i++){
          if(data[i]['senderUsername'] != req.body.username){
            if(messages[data[i]['senderUsername']]){
              messages[data[i]['senderUsername']].push(data[i])
            }else{
              messages[data[i]['senderUsername']] = [data[i]]
            }
          }else{
            if(messages[data[i]['receiverUsername']]){
              messages[data[i]['receiverUsername']].push(data[i])
            }else{
              messages[data[i]['receiverUsername']] = [data[i]]
            }
          }
        }

        res.send(messages); 

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

  exports.getMessagesUsernamebyAccountId = async(req,res) =>{
    var accountId = req.body.accountId
    // const [senders, metadata_senders] = await sequelize.query(`SELECT * FROM Messages INNER JOIN Accounts b ON Messages.senderAccountId=b.accountId WHERE Messages.senderAccountID = ${accountId} OR Messages.receiverAccountID = ${accountId}`);
    const [senders, metadata_senders] = await sequelize.query(`SELECT * FROM Messages LEFT JOIN Accounts b ON Messages.senderAccountId=b.accountId LEFT JOIN Accounts c ON Messages.receiverAccountId=c.accountId `);

    res.send({senders: senders})
  }