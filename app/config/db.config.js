//https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
// max: maximum number of connection in pool
// min: minimum number of connection in pool
// idle: maximum time, in milliseconds, that a connection can be idle before being released
// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error

// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "spm",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000, 
//       idle: 10000
//     }
//   };



module.exports = {
    HOST: "spm.czmzwyti4icp.ap-southeast-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "regopq==",
    DB: "lms_test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};