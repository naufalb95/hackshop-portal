'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    const fs = require('fs')
    let data = JSON.parse(fs.readFileSync('./data/usersdata.json'))
    data.forEach( element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('UserDatas', data)
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserDatas', null)
  }
};
