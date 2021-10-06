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

// =================== MODELS ===================

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

// ================== ASSOCIATIONS ======================
/*
Sample - https://sequelize.org/v3/docs/associations/
    var City = sequelize.define('city', { countryCode: Sequelize.STRING });
    var Country = sequelize.define('country', { isoCode: Sequelize.STRING });

    Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
    City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
*/

db.Quiz.hasMany(db.Question, {foreignKey: 'quizId', sourceKey: 'quizId'});
db.Question.belongsTo(db.Quiz, {foreignKey: 'quizId', targetKey: 'quizId'});

db.Question.hasMany(db.QuestionOption, {foreignKey: 'questionId', sourceKey: 'questionId'});
db.QuestionOption.belongsTo(db.Question, {foreignKey: 'questionId', targetKey: 'questionId'});

// ================== SYNC ==================
db.sequelize.sync(); //drop the table if it already exists

module.exports = db;
