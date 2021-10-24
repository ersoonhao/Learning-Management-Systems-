module.exports = (sequelize, Sequelize) => {
    const prerequisiteSet = sequelize.define("PrerequisiteSet", {
        setNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
      course_fk: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
    });
  
    return prerequisiteSet;
  };
  