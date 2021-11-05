Vue.component('user',
            {data: function () {
            return {
              
            }},created:()=>{
              
            }, 
            props: {username:String, message_set: Object, account_id: Number, selected: Boolean, app_selected: Number},
            template: `<div v-bind:class="{ selected: selected }" class='user' @click="select(message_set.accountId) ">{{username}}</div>`,
            methods:{
              select(accountId) {
                console.log(this.account_id)
                console.log(this.selected)
                this.$emit('update-select', accountId)
              }
            }
            })

            Vue.component('searched-user',
            {data: function () {
            return {
              
            }},created:()=>{
              
            }, 
            props: {username:String},
            template: `<div class='user' @click="select() ">{{username}}</div>`,
            methods:{
              select() {
                console.log(this.username)
                this.$emit('name-select', this.username)
              }
            }
            })

Vue.component('message',{
              data: function () {
                return {
                  ifEdit: false,
                  new_msg: ''
                }},
              props: {msg_object: Object, account_id: String},
              template: `<div>
                <li v-if="!ifEdit">{{msg_object.text}} <span id='sender'>{{msg_object.sender}}</span><button v-if="sender" class="btn btn-danger btn-sm" @click="delete_msg()">Delete Message</button><button v-if="sender" class="btn btn-warning btn-sm" @click="edit_msg()">Edit Message</button></li>
                <li v-if="ifEdit"><textarea v-model="new_msg"></textarea><button class="btn btn-warning btn-sm" @click="finish_edit()">Finish Edit</button><button class="btn btn-secondary btn-sm" @click="cancel_edit()">Cancel Edit</button></li>
                </div>`,
              methods:{
                delete_msg(){
                  console.log(this.msg_object)
                  this.$emit('delete-msg', this.msg_object)
                },
                edit_msg(){
                  this.ifEdit = true
                  this.new_msg = this.msg_object.text
                },
                finish_edit(){
                  this.ifEdit = false
                  this.$emit('finish-edit', this.msg_object, this.new_msg)
                },
                cancel_edit(){
                  this.ifEdit = false
                }
              },
              computed: {
                sender(){
                  if(String(this.msg_object.senderAccountId) == String(this.account_id)){
                    return true
                  }
                  else{
                    return false
                  }
                }
              }
            })


var socket = io({autoConnect: false});

const app = new Vue({
                el: '#app',
                data: {
                    session: getUserSession(),
                    menu: initMenu(MENU_SECTIONS_MANAGE_GENERAL, 0, 0),
                    current_messages : [],
                    newMessage: '',
                    accountId: '',
                    all_messages : [],
                    selected: '',
                    search_term: '',
                    searched_users: [],
                    all_users : [],
                }, created: () => {

                  axios
                  .post(API(`/message/all/session`), {session: getUserSession()})
                  .then(response=>{
                    console.log(response.data)
                    app.all_messages = response.data
                    app.all_users = Object.keys(app.all_messages['messages'])
                    var accountId = String(response.data.accountId)
                    app.accountId = accountId
                    socket.auth = {accountId}
                    socket.connect()
                  })
                  
                  socket.on('chat message', function(msg) {

                    console.log(msg)
                    
                    for(const name in app.all_messages['messages']){
                      
                      if(app.all_messages['messages'][name].accountId == msg.receiverAccountId || app.all_messages['messages'][name].accountId == msg.senderAccountId){
                        console.log('match found')
                        console.log(app.all_messages['messages'][name].messages)
                        app.all_messages['messages'][name].messages.push({messageId: msg.messageId, text:msg.text,senderAccountId: msg.senderAccountId, receiverAccountId: msg.receiverAccountId, sender: msg.sender_username, receiver: msg.sender_username})
                        
                      }
                    }

                  // app.current_messages.push({text:msg.msg,senderAccountId: msg.sender, receiverAccountId: msg.receiver})
                  });

                  socket.on('delete message', function(messageId){
                    console.log(messageId)
                    for(const name in app.all_messages['messages']){
                      for(const message of app.all_messages['messages'][name].messages){
                        if(message.messageId == messageId){
                          app.all_messages['messages'][name].messages.splice(app.all_messages['messages'][name].messages.indexOf(message), 1)
                        }
                      }
                    }
                  })

                  socket.on('edit message', function(msg){
                    console.log(msg.messageId, msg.new_msg)
                    for(const name in app.all_messages['messages']){
                      for(const message of app.all_messages['messages'][name].messages){
                        if(message.messageId == msg.messageId){
                          message.text = msg.new_msg;
                        }
                      }
                    }
                  })

                }, methods:{
                  sendMessage: function(event){
                    event.preventDefault()
                    if (app.newMessage && app.accountId && app.selected) {
                    socket.emit('chat message', {msg: app.newMessage, receiverAccountId: app.selected, senderAccountId: app.accountId});
                    app.newMessage = '';
                }
                  }, 
                  // connect: function(event){
                  // // console.log(app.session.username)
                  // // var username = app.session.username
                  
                  // const username_sessionId = event.target.value.split("_")
                  // console.log(username_sessionId)
                  // var sessionObj = {session:{username: username_sessionId[0], sessionId: username_sessionId[1]}}
                  // console.log(sessionObj)
                  // axios
                  // .post(API(`/message/all/session`), sessionObj)
                  // .then(response=>{
                  //   console.log(response.data)
                  //   app.all_messages = response.data
                  //   app.all_users = Object.keys(app.all_messages['messages'])
                  //   var accountId = String(response.data.accountId)
                  //   app.accountId = accountId
                  //   socket.auth = {accountId}
                  //   socket.connect()
                  // })
                  // app.accountId = event.target.value
                  // var accountId = app.accountId
                  // axios
                  // .get(API(`/message/all/${accountId}`))
                  // .then(response => (
                  //     console.log(response.data),
                  //     app.all_messages = response.data,
                  //     app.all_users = Object.keys(app.all_messages['messages'])
                  //     ))
                  // socket.auth = {accountId};
                  // socket.connect();

                // },
                updateSelect:function(e){
                  // console.log('hi')
                  // console.log(e)
                  app.selected = e
                  for(const name in app.all_messages['messages']){
                      if(app.all_messages['messages'][name].accountId == app.selected){
                        console.log(app.all_messages['messages'][name].messages)
                        app.current_messages = app.all_messages['messages'][name].messages;
                      }
                    }
                },partialSearch:function(){

                  app.searched_users = []

                    for(var i = 0; i < app.all_users.length; i++){
                        if(app.all_users[i].toLowerCase().includes(app.search_term.toLowerCase())){
                          app.searched_users.push(app.all_users[i])
                        }
                    }
                },nameSelect:function(e){
                  // console.log('hi')
                  // console.log(e)
                  app.searched_users = []
                  app.search_term = ''
                  
                  for(const name in app.all_messages['messages']){
                      if(name == e){
                        console.log(app.all_messages['messages'][name].messages)
                        app.current_messages = app.all_messages['messages'][name].messages;
                        app.selected = app.all_messages['messages'][name].accountId
                      }
                    }
                },delete_msg:function(messageObj){
                  console.log(messageObj.messageId, messageObj.senderAccountId, messageObj.receiverAccountId);
                  socket.emit('delete message', {messageId: messageObj.messageId, receiverAccountId: messageObj.receiverAccountId, senderAccountId: messageObj.senderAccountId});
                },finish_edit:function(messageObj,new_msg){
                  console.log(messageObj,new_msg)
                  socket.emit('edit message', {messageId: messageObj.messageId, receiverAccountId: messageObj.receiverAccountId, senderAccountId: messageObj.senderAccountId, new_msg: new_msg});
                }
                }
                        });
            