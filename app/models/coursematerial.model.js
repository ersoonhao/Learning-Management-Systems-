// need a section FK here. 

module.exports = (sequelize, Sequelize) => {
    const CourseMaterial = sequelize.define("CourseMaterial", {
        CourseMaterialId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        instructions: {
            type: Sequelize.STRING
        },
        // source is a s3 link 
        source: {
            type: Sequelize.STRING
        },
        // vid, pdf , doc , ? 
        type: {
            type: Sequelize.STRING
        },
        // Order is the positions 
        ordering: {
            type: Sequelize.INTEGER
        },
        sectionId: {
            type: Sequelize.INTEGER
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return CourseMaterial;
};