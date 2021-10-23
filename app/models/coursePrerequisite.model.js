module.exports = (sequelize, Sequelize) => {
    const coursePrerequisite = sequelize.define("CoursePrerequisite", {
        setNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
      course_fk: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
    });
  
    return coursePrerequisite;
  };
  