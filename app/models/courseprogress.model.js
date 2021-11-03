

module.exports = (sequelize, Sequelize) => {
    const CourseProgress = sequelize.define("CourseProgress", {
        courseProgressId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        progress: {
            type: Sequelize.INTEGER
        }
    });
    return CourseProgress; 
};

