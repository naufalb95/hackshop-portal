'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isVerificated', {type: Sequelize.BOOLEAN})
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isVerificated')
  }
};
