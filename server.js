const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { uploadFile, getFileStream } = require('./s3')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ================ Multer  ================
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
    // ================ AWS Related Controllers  ================
const AccountCTRL = require("./app/controllers/account.controller");
const SectionCTRL = require("./app/controllers/section.controller");
const getYoutubeTitle = require('get-youtube-title')
var getYouTubeID = require('get-youtube-id');
// ================ Routes ================
app._FRONT_END_PATH = __dirname + '/app/views/';
//app.use(express.static(app._FRONT_END_PATH));
app._TEST_PATH = __dirname + '/test/';

app.use(express.static(__dirname + "/app/static/"));

app.get("/test", (req, res) => {
    res.json({ message: "Test working @ port 8081" });
});

//Backend
// require("./app/routes/backend/turorial.routes")(app);

require("./app/routes/backend/account.routes")(app);
require("./app/routes/backend/quiz.routes")(app);
require("./app/routes/backend/quizAttempt.routes")(app);
require("./app/routes/backend/course.routes")(app);
require("./app/routes/backend/class.routes")(app);
require("./app/routes/backend/forum.routes")(app);
require("./app/routes/backend/message.routes")(app);
require("./app/routes/backend/prerequisiteSet.routes")(app);
require("./app/routes/backend/section.routes")(app);
require("./app/routes/backend/enrollment.routes")(app);
require("./app/routes/backend/coursePrerequisite.routes")(app);
require("./app/routes/backend/withdrawal.routes")(app);
// port 8081

//Front-end
require("./app/routes/frontend/main.froutes")(app);
require("./app/routes/frontend/course.froutes")(app);
require("./app/routes/frontend/manage.froutes")(app);
require("./app/routes/frontend/forum.froutes")(app);



// ================ CORS ================
// Cross-origin resource sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. 
app.use(cors({
    //origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.set("Content-Security-Policy", "connect-src");
    next()
})

// ================ PARSERS ================
// app.use(bodyParser.json()); // parse requests of content-type - application/json
// app.use(bodyParser.urlencoded({ extended: true })); 


// ================ MODELS ================
const db = require('./app/models')
let reset_db = false;

if (reset_db) {
    db.sequelize_force_reset.then(() => { //Reset database
        // Init Dummy Data
        require("./app/dummy/load")
    });
} else {
    db.sequelize.sync({ alter: true });
}

// ================ CHAT ================
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require("./chat")(io)






//link

//image
app.post('/video', async(req, res) => {
    // console.log("BODY", req.body);
    // console.log("REQ", req);
    // const file = req.file;
    var title; 
    var source; // link  
    
    if(req.body.source){
        source=req.body.source;
        console.log("source", source);
        // var splitURL=source.split(".");
        // getYoutubeTitle('ZjM8Wq5pQ2o', function (err, title) {
        //     console.log(title)
        //     title="place holder";
        //   })
    }else{res.status(400).send({ message: "Missing fields" });}
    
    if(req.body.title){
        title=req.body.title;
        console.log("title", title);
    }else{
        title="Course Video";
    }

    var instructions;

    if (req.body.instructions) {
        instructions = req.body.instructions;
    } else {
        instructions = "None";
    }
    if (req.body.ordering) {
        ordering = req.body.ordering;
    } else {
        ordering = -1;
    }
    if (req.body.sectionId) {
        sectionId = req.body.sectionId;
    } else {
        sectionId = 1;
    }

   
    var type = "link";
    // if (type.toLowerCase() != "png" || type.toLowerCase() != "jpg" || type.toLowerCase() != "jpeg") {
    //     res.status(400).send({ message: "Only images are allowed" });
    // }
  
    var sectionId = req.body.sectionId;
    var key = null;

    const extension = type;
    // if (file == null) {
    //     console.log("FILE IS NULL");
    //     res.status(400).send({ message: "No file uploaded" });
    // } else if (!instructions || !ordering || !sectionId) {
    //     res.status(400).send({ message: "Missing fields" });
    // } else {
    //     const result = await uploadFile(file, extension);
    //     console.log(result);
    //     if (result) {
    //         source = result.Location
    //         key = result.Key;
          
        
    //     }

    if (!instructions || !ordering || !sectionId) {
        res.status(400).send({ message: "Missing fields" });
    }

  
        var savetodb = await SectionCTRL.addCourseMaterial(title, instructions, source, type, ordering, sectionId, key);
        console.log("DB results", savetodb);
        if (savetodb) {
            res.status(200);
        } else {
            res.status(400).send({ message: "File not uploaded" });
        }
    })




//image
app.post('/image', upload.single('image'), async(req, res) => {
    // console.log("BODY", req.body);
    // console.log("REQ", req);
    const file = req.file;
    var title; 

    if(req.body.title){
        title=req.body.title;
    }else if(file.originalname){
        title=file.originalname;
    }
    else{ title="Course image"}

    // if(file.originalname){
    //     title=file.originalname;
    // }else{ title="Course Document"}
 
    var instructions;

    if (req.body.instructions) {
        instructions = req.body.instructions;
    } else {
        instructions = "None";
    }
    if (req.body.ordering) {
        ordering = req.body.ordering;
    } else {
        ordering = -1;
    }
    if (req.body.sectionId) {
        sectionId = req.body.sectionId;
    } else {
        sectionId = 1;
    }

   
    var type = file.fieldname;
    console.log("type here", type);
    if (type.toLowerCase() != "image") {
        res.status(400).send({ message: "Only images are allowed" });
    }
    var source; // link  
    var sectionId = req.body.sectionId;
    var key;

    const extension = type;
    if (file == null) {
        console.log("FILE IS NULL");
        res.status(400).send({ message: "No file uploaded" });
    } else if (!instructions || !ordering || !sectionId) {
        res.status(400).send({ message: "Missing fields" });
    } else {
        const result = await uploadFile(file, extension);
        console.log(result);
        if (result) {
            source = result.Location
            key = result.Key;
          
        
        }

  
        var savetodb = await SectionCTRL.addCourseMaterial(title, instructions, source, type, ordering, sectionId, key);
        console.log("DB results", savetodb);
        if (savetodb) {
       
            res.status(200);
        } else {
            res.status(400).send({ message: "File not uploaded" });
        }
    }
})



// done pdf 
app.post('/pdf', upload.single('pdf'), async(req, res) => {
    // console.log("BODY", req.body);
    console.log("REQ", req);
    const file = req.file;
    var title; 


    
    if(req.body.title){
        title=req.body.title;
    }else if(file.originalname){
        title=file.originalname;
    }
    else{ title="Course Document"}


    // if(file.originalname){
    //     title=file.originalname;
    // }else{ title="Course Document"}
 
    var instructions;

    if (req.body.instructions) {
        instructions = req.body.instructions;
    } else {
        instructions = "None";
    }
    if (req.body.ordering) {
        ordering = req.body.ordering;
    } else {
        ordering = -1;
    }
    if (req.body.sectionId) {
        sectionId = req.body.sectionId;
    } else {
        sectionId = 1;
    }

   
    var type = file.fieldname;
    if (type.toLowerCase() != "pdf"){
        res.status(400).send({ message: "Only PDFs are allowed" });
    }
    var source; // link  
    var sectionId = req.body.sectionId;
    var key;

    const extension = ".pdf"
    if (file == null) {
        console.log("FILE IS NULL");
        res.status(400).send({ message: "No file uploaded" });
    } else if (!instructions || !ordering || !sectionId) {
        res.status(400).send({ message: "Missing fields" });
    } else {
        const result = await uploadFile(file, extension);
        console.log(result);
        if (result) {
            source = result.Location
            key = result.Key;
            // title = file.originalname;
        
        }

        // const description = req.body.description
        // var savetodb = await SectionCTRL.getAllCourseMaterials();
        var savetodb = await SectionCTRL.addCourseMaterial(title, instructions, source, type, ordering, sectionId, key);
        console.log("DB results", savetodb);
        if (savetodb) {
            // how come this happens? 
            // res.status(200).send({ message: "File uploaded" });
            res.status(200).json;
        } else {
            res.status(400).send({ message: "File not uploaded" });
        }
    }



    // res.status(200).send({message:"file uploaded successfully"}); 
    // res.status(200).send({ pdfPath: `/pdfs/${result.Key}` });


})



// done 
app.post('/docx', upload.single('docx'), async(req, res) => {
    // console.log("BODY", req.body);
    // console.log("REQ", req);
    const file = req.file;
    var title; 

    if(req.body.title){
        title=req.body.title;
    }else if(file.originalname){
        title=file.originalname;
    }
    else{ title="Course Document"}




    // if(file.originalname){
    //     title=file.originalname;
    // }else{ title="Course Document"}
 
    var instructions;

    if (req.body.instructions) {
        instructions = req.body.instructions;
    } else {
        instructions = "None";
    }
    if (req.body.ordering) {
        ordering = req.body.ordering;
    } else {
        ordering = -1;
    }
    if (req.body.sectionId) {
        sectionId = req.body.sectionId;
    } else {
        sectionId = 1;
    }

   
    var type = file.fieldname;
    if (type.toLowerCase() != "docx"){
        res.status(400).send({ message: "Only docx are allowed" });
    }
    var source; // link  
    var sectionId = req.body.sectionId;
    var key;

    const extension = ".pdf"
    if (file == null) {
        console.log("FILE IS NULL");
        res.status(400).send({ message: "No file uploaded" });
    } else if (!instructions || !ordering || !sectionId) {
        res.status(400).send({ message: "Missing fields" });
    } else {
        const result = await uploadFile(file, extension);
        console.log(result);
        if (result) {
            source = result.Location
            key = result.Key;
          
        
        }

  
        var savetodb = await SectionCTRL.addCourseMaterial(title, instructions, source, type, ordering, sectionId, key);
        console.log("DB results", savetodb);
        if (savetodb) {
       
            res.status(200);
        } else {
            res.status(400).send({ message: "File not uploaded" });
        }
    }
})


// can embedded the image in 
app.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

app.get('/pdfs/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})



// ================ SETUP ================
const PORT = process.env.PORT || 8081; //Set port, listen for requests
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;