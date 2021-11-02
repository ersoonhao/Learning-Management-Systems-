const db = require("./app/models/index");
const Message = db.Message;
const sequelize = db.sequelize;
const axios = require('axios')

// const Op = db.Sequelize.Op;

module.exports = function(io) {
  io.on('connection', (socket) => {

      console.log('a user connected');
      console.log(socket.handshake.auth)
      socket.join(socket.handshake.auth.accountId);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      socket.on('chat message', async ({msg,senderAccountId,receiverAccountId}) => {
          // io.emit('chat message', msg);
          // var message_info = await postData("/api/message/create",{text: msg, senderAccountId: sender, receiverAccountId: receiver})
          
          const message = {
            text: msg, 
            senderAccountId: senderAccountId, 
            receiverAccountId: receiverAccountId
        }

          const [sender_data, sender_metadata] = await sequelize.query(`SELECT a.username, a.accountId FROM Accounts a WHERE a.accountId=${senderAccountId}`)
          console.log(sender_data[0]['username'])

          const [receiver_data, receiver_metadata] = await sequelize.query(`SELECT a.username, a.accountId, a.email FROM Accounts a WHERE a.accountId=${receiverAccountId}`)
          console.log(receiver_data[0]['username'])

          var sender_username = sender_data[0]['username']
          var receiver_username = receiver_data[0]['username']
          var receiver_email = receiver_data[0]['email']

          Message.create(message)
            .then(data=>{

          console.log(data.dataValues.messageId)
          var messageId = data.dataValues.messageId
          var text = data.dataValues.text
          var senderAccountId = data.dataValues.senderAccountId
          var receiverAccountId = data.dataValues.receiverAccountId

          console.log(socket.handshake.auth.accountId)
          io.to(String(socket.handshake.auth.accountId)).to(String(receiverAccountId)).emit('chat message', {messageId, text, senderAccountId, receiverAccountId, sender_username, receiver_username})
          console.log('chat message')
          console.log({messageId, text, senderAccountId, receiverAccountId, sender_username, receiver_username})
          postData(`http://tbankonline.com/SMUtBank_API/Gateway?Header={"Header": {"serviceName": "sendEmail", "userID": "S9800980I", "PIN": "123456", "OTP": "999999"}}&Content={"Content": {"emailAddress": "${receiver_email}", "emailSubject": "Message from ${sender_username}", "emailBody": "You've received the message '${text}' from ${sender_username}"}}`,'')
          });
        
        })

        socket.on('delete message',async({senderAccountId, receiverAccountId, messageId})=>{
          console.log(`message Id is ${messageId}, sender account Id is ${senderAccountId}, receiver account Id is ${receiverAccountId}`)
          Message.destroy({
            where: { messageId: messageId }
          })
            .then(num => {
              if (num == 1) {
                io.to(String(senderAccountId)).to(String(receiverAccountId)).emit('delete message',messageId);
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
        })

        socket.on('edit message',async({senderAccountId, receiverAccountId, messageId, new_msg})=>{
          console.log(`message Id is ${messageId}, sender account Id is ${senderAccountId}, receiver account Id is ${receiverAccountId} and new message is ${new_msg}`)
          Message.update({text: new_msg}, {
            where: { messageId: messageId }
          })
            .then(num => {
              if (num == 1) {
                io.to(String(senderAccountId)).to(String(receiverAccountId)).emit('edit message',{messageId, new_msg});
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
        })

      })

      
 
};

async function postData(url, stringData) {
  let resp = await axios({
    method: 'post',
    url: url,
    data: stringData,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000
  }).catch(err => {
    throw err;
  })
  console.log("postData: response:", resp.data);
  return resp;
}


// function partialSearchAlgorithm(list, string_value){

//     var result = []
//     for(var i = 0; i < list.length; i++){
//         if(list[i].toLowerCase().includes(string_value.toLowerCase())){
//             result.push(list[i])
//         }
//     }

//     console.log("answer is "+String(result))

//     return result

// }

// partialSearchAlgorithm(["hello", "world", "how", "are", "you", "hell"], "he")

// async function getData(url, stringData) {
//   let resp = await axios({
//     method: 'get',
//     url: url,
//     data: stringData,
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     maxContentLength: 100000000,
//     maxBodyLength: 1000000000
//   }).catch(err => {
//     throw err;
//   })
//   console.log("getData: response:", resp.data);
//   return resp;
// }


// async function DeleteData(url, stringData) {
//   let resp = await axios({
//     method: 'delete',
//     url: url,
//     data: stringData,
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     maxContentLength: 100000000,
//     maxBodyLength: 1000000000
//   }).catch(err => {
//     throw err;
//   })
//   console.log("DeleteData: response:", resp.data);
//   return resp;
// }

