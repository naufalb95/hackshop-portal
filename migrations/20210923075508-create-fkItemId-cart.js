'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts', 'ItemId',  {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Items'
        },
        key: 'id'
      }, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'ItemId')
  }
};
