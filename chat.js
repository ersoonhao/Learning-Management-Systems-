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
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    
        socket.on('chat message', msg => {
            io.emit('chat message', msg);
            console.log('chat message')
          });
    });

    
};