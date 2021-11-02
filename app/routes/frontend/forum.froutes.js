module.exports = app => {
    app.get('/forum', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/forum.html')
    })
    app.get('/forum/unresolved', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/unresolved.html')
    })
    app.get('/forum/thread', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/thread.html')
    })
    app.get('/forum/createThread', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/createThread.html')
    })
    app.get('/forum/addAnswer', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/addAnswer.html')
    })
    app.get('/forum/addComment', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + '/forum/addComment.html')
    })
}