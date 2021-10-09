const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//================  Upload ================ 
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({ 
    accessKeyId: "d788659e-d606-4e2b-9774-c20e6d29812f",
    // secretAccessKey: IAM_USER_SECRET,
    Bucket: 'elasticbeanstalk-ap-southeast-1-118103674449',
    signatureVersion: 'v4'
})

// const uploadFile = require("../middleware/upload");
// const fs = require("fs");
// const baseUrl = "http://localhost:8080/files/";



var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'elasticbeanstalk-ap-southeast-1-118103674449',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      serverSideEncryption: 'AES256',
    //   contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })


//  ================ End of Upload ================ 

const app = express();
app.use(express.json())

// ================ Routes ================
app._FRONT_END_PATH = __dirname + '/app/views/';
//app.use(express.static(app._FRONT_END_PATH));

app.use(express.static(__dirname + "/app/static/"));

app.get("/test", (req, res) => {
  res.json({ message: "Test working @ port 8081" });
});

//Backend
//require("./app/routes/backend/turorial.routes")(app);

require("./app/routes/backend/account.routes")(app)
require("./app/routes/backend/quiz.routes")(app);
require("./app/routes/backend/question.routes")(app);
require("./app/routes/backend/questionOption.routes")(app);
require("./app/routes/backend/course.routes")(app);

//Front-end
require("./app/routes/frontend/main.froutes")(app);
require("./app/routes/frontend/quiz.froutes")(app);



// ================ CORS ================
// Cross-origin resource sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. 
app.use(cors({
    //origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// ================ PARSERS ================
// app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded


// ================ MODELS ================
// db.sequelize.sync(); //drop the table if it already exists

// Init Dummy Data
require("./app/dummy/quiz")




// ================ MAIN SERVER APIs ================
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
});


app.post('/upload2', upload.array('photos', 3), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files!')
  })


// ================ SETUP ================
const PORT = process.env.PORT || 8081; //Set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;