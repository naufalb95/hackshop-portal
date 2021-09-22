'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UserDatas', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserDatas', 'UserId')
  }
};
