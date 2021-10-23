module.exports = (sequelize, Sequelize) => {
    const coursePrerequisite = sequelize.define("CoursePrerequisite", {
        setNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
      courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
    });
  
    return coursePrerequisite;
  };
  