const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        multipleStatements: true
    },
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

db.sequelize_force_reset = () => {
    return new Promise((resolve, _) => {
        db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
            db.sequelize.sync({ force: true }).then(() => {
                db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(() => { resolve() })
            });
        })
    });
}

// =================== MODELS ===================
//db.Tutorial = require("./samples/tutorial.model.js")(sequelize, Sequelize);  

//Account
db.Account = require("./account.model")(sequelize, Sequelize);

//Course
db.Course = require("./course.model")(sequelize, Sequelize);
db.PrerequisiteSet = require("./prerequisiteSet.model")(sequelize, Sequelize);
db.CoursePrerequisite = require("./coursePrerequisite.model")(sequelize, Sequelize);

//Class
db.Class = require("./class.model")(sequelize, Sequelize);

//Section

//Quiz
db.Quiz = require("./quiz.model")(sequelize, Sequelize);
db.Question = require("./question.model")(sequelize, Sequelize);
db.QuestionOption = require("./questionOption.model")(sequelize, Sequelize);

//Forum
db.Thread = require("./thread.model")(sequelize, Sequelize);
db.Post = require("./post.model")(sequelize, Sequelize);
db.Comment = require("./comment.model")(sequelize, Sequelize);

//Chat
db.Message = require("./message.model")(sequelize, Sequelize);

// ================== ASSOCIATIONS ======================
/*
Sample - https://sequelize.org/v3/docs/associations/
    var City = sequelize.define('city', { countryCode: Sequelize.STRING });
    var Country = sequelize.define('country', { isoCode: Sequelize.STRING });

    Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
    City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
*/

db.Quiz.hasMany(db.Question, {foreignKey: 'quizId', sourceKey: 'quizId', onDelete: 'cascade', onUpdate: 'NO ACTION' });
db.Question.belongsTo(db.Quiz, {foreignKey: 'quizId', targetKey: 'quizId'});

db.Question.hasMany(db.QuestionOption, {foreignKey: 'questionId', sourceKey: 'questionId', onDelete: 'cascade', onUpdate: 'NO ACTION' });
db.QuestionOption.belongsTo(db.Question, {foreignKey: 'questionId', targetKey: 'questionId'});

db.Thread.hasMany(db.Post, {foreignKey: 'threadId', sourceKey: 'threadId', onDelete: 'cascade' });
db.Post.belongsTo(db.Thread, {foreignKey: 'threadId', targetKey: 'threadId'});

db.Post.hasMany(db.Comment, {foreignKey: 'postId', sourceKey: 'postId', onDelete: 'cascade' });
db.Comment.belongsTo(db.Post, {foreignKey: 'postId', targetKey: 'postId'});

// ================== SYNC ==================
db.sequelize.sync();

module.exports = db;
