module.exports = app => {
    app.get('/', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/main/index.html")
    })
}