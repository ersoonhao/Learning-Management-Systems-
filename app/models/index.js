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

db.Accounts = require("./account.model.js")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.Quizzes = require("./quiz.model")(sequelize, Sequelize);
db.Questions = require("./question.model")(sequelize, Sequelize);
db.QuestionOptions = require("./questionOption.model")(sequelize, Sequelize);
db.Course = require("./course.model")(sequelize, Sequelize);

module.exports = db;
