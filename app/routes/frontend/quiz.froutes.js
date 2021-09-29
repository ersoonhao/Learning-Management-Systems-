module.exports = app => {
    app.get('/quiz/create', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/quiz/create_quiz.html")
    })

    app.get('/quiz/view', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/quiz/view_quiz.html")
    })
}