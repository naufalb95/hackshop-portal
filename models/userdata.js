'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    static associate(models) {
      UserData.belongsTo(models.User);
    }
  }

  UserData.init({
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
}