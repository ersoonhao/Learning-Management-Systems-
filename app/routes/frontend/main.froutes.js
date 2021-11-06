module.exports = app => {
    app.get('/', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + "/main/index.html")
    })
    app.get('/login', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/main/login.html")
    })

    app.get('/chat', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + "/chat/chat.html")
    })

    app.get('/chat_test', async(req, res) => {
        res.sendFile(app._TEST_PATH + "/unit/unit_ui_chat.html")
    })

}