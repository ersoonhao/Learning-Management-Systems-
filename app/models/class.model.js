module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("Class", {
        classId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        classStartDateTime:{
            type:Sequelize.DATE
        },
        classEndDateTime:{
            type:Sequelize.DATE
        },
        selfEnrolStartDateTime:{
            type:Sequelize.DATE
        },
        selfEnrolEndDateTime:{
            type:Sequelize.DATE
        },
        maxCapacity:{
            type:Sequelize.INTEGER
        }
    });
    return Class; 
};
  