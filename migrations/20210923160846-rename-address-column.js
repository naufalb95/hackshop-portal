'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('UserData', 'address', 'location');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('UserData', 'location', 'address');
  }
};
