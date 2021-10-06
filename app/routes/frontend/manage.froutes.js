module.exports = app => {
    app.get('/manage', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/manage.html")
    })
    app.get('/manage/courses', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/courses.html")
    })
    app.get('/manage/course', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/course.html")
    })
    app.get('/manage/classes', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/classes.html")
    })
    app.get('/manage/class', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/class.html")
    })
    app.get('/manage/sections', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section//sections.html")
    })
    app.get('/manage/section', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section//section.html")
    })
}