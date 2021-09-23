'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('UserData', 'location', {type: Sequelize.STRING})
  },
  
  down:  (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('UserData', 'location', {type: Sequelize.TEXT})
  }
};
