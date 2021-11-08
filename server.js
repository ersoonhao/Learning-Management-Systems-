const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json())


// Multer & specifying upload directory  
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




const { uploadFile, getFileStream } = require('./s3')
// end of Multer 



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
require("./app/routes/backend/course.routes")(app);
require("./app/routes/backend/class.routes")(app);
require("./app/routes/backend/forum.routes")(app);
require("./app/routes/backend/message.routes")(app);
require("./app/routes/backend/prerequisiteSet.routes")(app);
require("./app/routes/backend/enrollment.routes")(app);
require("./app/routes/backend/coursePrerequisite.routes")(app);
require("./app/routes/backend/section.routes")(app);

require("./app/routes/backend/withdrawal.routes")(app);
// port 8081

//Front-end
require("./app/routes/frontend/main.froutes")(app);
require("./app/routes/frontend/manage.froutes")(app);
require("./app/routes/frontend/course.froutes.js")(app);
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
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded


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


// ================ SETUP ================
const PORT = process.env.PORT || 8081; //Set port, listen for requests


// my own middlewear for images ?? 
// cuz front end upload image
app.post('/images', upload.single('image'), async (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    const file = req.file;
    const extension=".jpeg"
    const result= await uploadFile(file,extension);
    console.log(result);
    const description = req.body.description 

    res.status(200).send({imagePath: `/images/${result.Key}`}); 

  })


  app.post('/pdfs', upload.single('pdf'), async (req, res) => {    
    const file = req.file;
    const extension=".pdf"
    // console.log(file); 
    const result= await uploadFile(file,extension);
    console.log(result);
    const description = req.body.description 

    res.status(200).send({pdfPath: `/pdfs/${result.Key}`}); 

  })

  app.post('/docs', upload.single('docx'), async (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
    const file = req.file;
    const extension=".docx"
    // console.log(file); 
    const result= await uploadFile(file,extension);
    console.log(result);
    const description = req.body.description 

    res.status(200).send({pdfPath: `/docs/${result.Key}`}); 

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;