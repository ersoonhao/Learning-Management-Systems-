module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("Course", {
        courseId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type:Sequelize.STRING(256)
        },
        description:{
            type:Sequelize.STRING(500)
        },
        active:{
            type: Sequelize.BOOLEAN
        }
    });
    return Course; 
};
  