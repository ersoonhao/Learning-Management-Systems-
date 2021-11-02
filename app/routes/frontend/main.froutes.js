module.exports = app => {
    app.get('/', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/main/index.html")
    })
    app.get('/login', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/main/login.html")
    })

    app.get('/chat', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/chat/chat.html")
    })
}