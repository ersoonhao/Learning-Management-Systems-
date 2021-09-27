
// title is Mr / Ms. Gotta be polite yo. 
module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("Account", {
    accountId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    // title: {
    //   type: Sequelize.STRING
    // }, 
    // firstName: {
    //   type: Sequelize.STRING
    // },
    // lastName: {
    //     type: Sequelize.STRING
    //   },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    isTrainer: {
        type: Sequelize.BOOLEAN
    },
    isLearner: {
        type: Sequelize.BOOLEAN
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    dateUpdated: {
        type: Sequelize.DATE
    }
    
  });

  return Account; 
};
