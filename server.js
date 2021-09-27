const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.json())

require("./app/routes/accounts.routes")(app)
require("./app/routes/turorial.routes")(app);
app.use(express.static(path));


// Cross-origin resource sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. 
var corsOptions = {
  origin: "*"
};

// var corsOptions = {
//     origin: "api.akashic.technology/#/"
//   };


app.use(cors(corsOptions));

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

// added cors for aws?? 
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next();
//   });


db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', function (req,res) {
  console.log(path);
  res.sendFile(path + "index.html");
});



app.get('/quiz',async(req,res)=>{
  res.sendFile(path+"quiz.html")
})


app.get("/test", (req, res) => {
    res.json({ message: "Test working @ port 8081" });
  });

// set port, listen for requests
const PORT = process.env.PORT || 8081;
// const PORT =  8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;