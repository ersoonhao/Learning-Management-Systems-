module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("Class", {
        classId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        classStartDateTime: {
            type:Sequelize.DATE
        },

        classEndDateTime:{
            type:Sequelize.DATE
        },

        selfEnrollStartDateTime:{
            type:Sequelize.DATE
        },

        selfEnrollEndDateTime:{
            type:Sequelize.DATE
        },

        maxCapacity:{
            type:Sequelize.INTEGER
        },

        courseId:{
            type:Sequelize.INTEGER
        },

        trnAccountId:{
            type:Sequelize.INTEGER
        },

        adminAccountId:{
            type:Sequelize.INTEGER
        }

    });
    return Class;
};
