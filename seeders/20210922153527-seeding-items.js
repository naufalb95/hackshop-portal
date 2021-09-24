'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fs = require('fs');
    let data = JSON.parse(fs.readFileSync('./data/items.json'));
    data.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('Items', data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null);
  }
};
