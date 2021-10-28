const db = require("./app/models/index");
const Message = db.Message;
// const Op = db.Sequelize.Op;
// const sequelize = db.sequelize;
// const axios = require('axios')

module.exports = function(io) {
  io.on('connection', (socket) => {

      console.log('a user connected');
      console.log(socket.handshake.auth)
      socket.join(socket.handshake.auth.accountId);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      socket.on('chat message', async ({msg, sender, receiver}) => {
          // io.emit('chat message', msg);
          // var message_info = await postData("/api/message/create",{text: msg, senderAccountId: sender, receiverAccountId: receiver})

          const message = {
            text: msg, 
            senderAccountId: sender, 
            receiverAccountId: receiver
        }

          Message.create(message)
            .then(data=>{

          var messageId = data.messageId
          var text = data.text
          var sender = data.senderAccountId
          var receiver = data.receiverAccountId
          console.log(socket.handshake.auth.accountId)
          io.to(String(socket.handshake.auth.accountId)).to(String(receiver)).emit('chat message', {messageId, text, sender, receiver});
          console.log('chat message')
          console.log({msg, sender, receiver})

          }).catch(err=>{
          res.status(500).send({
            message:
            err.message || "Some error occured while creating the Message"
          })
          })
          
        });


  });

  

  
};

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

// async function postData(url, stringData) {
//   let resp = await axios({
//     method: 'post',
//     url: url,
//     data: stringData,
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     maxContentLength: 100000000,
//     maxBodyLength: 1000000000
//   }).catch(err => {
//     throw err;
//   })
//   console.log("postData: response:", resp.data);
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

