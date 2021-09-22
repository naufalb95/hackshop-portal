'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UserData', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserData', 'UserId')
  }
};
