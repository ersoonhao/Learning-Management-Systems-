
// title is Mr / Ms. Gotta be polite yo. 
module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("Section", {
        sectionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type:Sequelize.STRING
        },
        title:{
            type:Sequelize.STRING
        },
        subtitle: {
            type:Sequelize.STRING
        },
        order: {
            type: Sequelize.INTEGER
        }
    });
    return Section; 
};

