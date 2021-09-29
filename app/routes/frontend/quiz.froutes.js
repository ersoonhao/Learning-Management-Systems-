module.exports = app => {
    app.get('/quiz', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/quiz/create_quiz.html")
    })
}