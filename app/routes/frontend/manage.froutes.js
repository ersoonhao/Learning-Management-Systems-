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
    app.get('/manage/course/create', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/createCourse.html")
    })
    app.get('/manage/gquiz', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section/quiz.html")
    })
    app.get('/manage/classes', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/classes.html")
    })
    app.get('/manage/class', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/class.html")
    })
    app.get('/manage/learners', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/learners.html")
    })
    app.get('/manage/sections', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section/sections.html")
    })
    app.get('/manage/section', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section/section.html")
    })
    app.get('/manage/materials', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section/materials.html")
    })
    app.get('/manage/ugquiz', async(req,res)=>{
        res.sendFile(app._FRONT_END_PATH + "/manage/course/class/section/quiz.html")
    })
}