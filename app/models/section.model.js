module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("Section", {
        sectionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        subtitle: {
            type: Sequelize.STRING
        },
        ordering: {
            type: Sequelize.INTEGER
        },
        classId: {
            type: Sequelize.INTEGER
        }
    });
    return Section;
};