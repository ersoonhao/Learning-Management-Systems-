const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

async function connect(){
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('Connection to the database has been established successfully.');
  }
  catch (error) {
    console.error(error.message);
    process.exit(-1);
  }
};

const db = {};

db.connect = connect;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Sample
db.Tutorial = require("./samples/tutorial.model.js")(sequelize, Sequelize); 

//Account
db.Account = require("./account.model.js")(sequelize, Sequelize);

//Course
db.Course = require("./course.model")(sequelize, Sequelize);

//Class

//Section

//Quiz
db.Quiz = require("./quiz.model")(sequelize, Sequelize);
db.Question = require("./question.model")(sequelize, Sequelize);
db.QuestionOption = require("./questionOption.model")(sequelize, Sequelize);

module.exports = db;
