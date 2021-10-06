const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
const db = require('./app/models')
let reset_db = true;

if(reset_db){
    db.sequelize.sync({ force: true }).then(() => { //Reset database
        // Init Dummy Data
        require("./app/dummy/quiz") 
      
    });
}


// ================ SETUP ================
const PORT = process.env.PORT || 8081; //Set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;