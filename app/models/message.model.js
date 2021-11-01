module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("Message", {
        messageId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
      text: {
        type: Sequelize.STRING
      },
      // senderUsername:{
      //   type: Sequelize.STRING
      // },
      // receiverUsername:{
      //   type: Sequelize.STRING
      // },
      senderAccountId: {
        type: Sequelize.INTEGER
      },
      receiverAccountId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Message;
  };
  