module.exports = app => {
    app.get('/course', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + "/course/course_general.html")
    })

    app.get('/class', async(req, res) => {
        res.sendFile(app._FRONT_END_PATH + "/class/class.html")
    })
    
    // app.get('/course/classes', async(req, res) => {
    //     res.sendFile(app._FRONT_END_PATH + "/course/classes.html")
    // })
    // app.get('/course/class', async(req, res) => {
    //     res.sendFile(app._FRONT_END_PATH + "/course/class.html")
    // })
}