const axios = require('axios')

async function getData(url, stringData) {
  let resp = await axios({
    method: 'get',
    url: url,
    data: stringData,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000
  }).catch(err => {
    throw err;
  })
  console.log("getData: response:", resp.data);
  return resp;
}

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

async function DeleteData(url, stringData) {
  let resp = await axios({
    method: 'delete',
    url: url,
    data: stringData,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000
  }).catch(err => {
    throw err;
  })
  console.log("DeleteData: response:", resp.data);
  return resp;
}

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
            var message_info = await postData("http://localhost:8081/api/message/create",{text: msg, senderAccountId: sender, receiverAccountId: receiver})
            var messageId = message_info.data.messageId
            var text = message_info.data.text
            var sender = message_info.data.senderAccountId
            var receiver = message_info.data.receiverAccountId
            console.log(socket.handshake.auth.accountId)
            io.to(String(socket.handshake.auth.accountId)).to(String(receiver)).emit('chat message', {messageId, text, sender, receiver});
            console.log('chat message')
            console.log({msg, sender, receiver})
          });


    });

    

    
};