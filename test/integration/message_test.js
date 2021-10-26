// CONTRIBUTOR: John Cheong
'use strict';

const request = require('supertest'); 
const app = require('../../server.js');
const assert = require('assert')

const dummy_reload = require("../../app/dummy/reload")

describe('The messsages route and controller',()=>{
  before(function(done){
      dummy_reload.reload().then(() => { done() })
  })

  it('creates one message through post request without message id',(done)=>{
    request(app).post('/api/message/create').send({text: 'test message', senderAccountId:1, receiverAccountId:2, senderUsername: 'robin', receiverUsername:'soonhao'}).end(
      (err,response)=>{
        assert(response.body.text == "test message")
        assert(response.body.senderAccountId == 1)
        assert(response.body.receiverAccountId == 2)
        done()
      }
    )
  })

  it('creates one message through post request with message id',(done)=>{
    request(app).post('/api/message/create').send({messageId: 13, text: 'test message', senderAccountId:1, receiverAccountId:2, senderUsername: 'robin', receiverUsername:'soonhao'}).end(
      (err,response)=>{
        assert(response.body.messageId == 13)
        assert(response.body.text == "test message")
        assert(response.body.senderAccountId == 1)
        assert(response.body.receiverAccountId == 2)
        done()
      }
    )
  })

  it('updates one message through post request with message id',(done)=>{
    request(app).post('/api/message/update').send({messageId: 13, text: 'update message test'}).end(
      (err,response)=>{
        console.log(response.body)
        assert(response.body.message == "Message was updated successfully.")
        done()
      }
    )
  })

  it('deletes message 9 through post request',(done)=>{
    request(app).post('/api/message/delete').send({messageId: 13}).end(
      (err,response)=>{
        assert(response.body.message == "Message was deleted successfully!")
        done()
      }
    )
  })

  it('retrieves one message through get request',(done)=>{
    request(app).get('/api/message/1').end(
      (err,response)=>{
        assert(response.body.text == 'Hi SoonHao, Robin Here')
        assert(response.body.senderAccountId == 1)
        assert(response.body.receiverAccountId == 2)
        assert(response.body.senderUsername == 'robin')
        assert(response.body.receiverUsername == 'soonhao')
        done()
      }
    )
  })

  it('retrieves all message through get request', (done)=>{
    request(app).get('/api/message/all').end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==13)
      done()
    }
    )
  })

  it('retrieves all message sent by account 4 or received by account 7 through post request', (done)=>{
    request(app).post('/api/message/pair').send({senderAccountId:4, receiverAccountId: 7}).end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==4)
      done()
    }
    )

    
  })

  it('retrieves all message sent by account 1 and received by account 2 through post request', (done)=>{
    request(app).post('/api/message/pair').send({senderAccountId:1, receiverAccountId: 2}).end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==5)
      done()
    }
    )

    
  })

  it('retrieves all message by account 4 where he is both sender or receiver through post request', (done)=>{
    request(app).post('/api/message').send({id:4}).end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body.length)
      assert(response.body.length==6)
      done()
    }
    )
  })

  it('retrieves all message by account robin where he is both sender or receiver through post request', (done)=>{
    request(app).post('/api/message/username').send({username: 'robin'}).end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body['soonhao'].length)
      assert(response.body['soonhao'].length==4)
      assert(response.body['asher'].length==2)
      assert(response.body['varun'].length==2)
      done()
    }
    )
  })

  it('retrieves all message by account soonhao where he is both sender or receiver through post request', (done)=>{
    request(app).post('/api/message/username').send({username: 'soonhao'}).end(
    (err,response)=>{
      console.log(response.body)
      console.log(response.body['robin'].length)
      assert(response.body['robin'].length==4)
      done()
    }
    )
  })
})

