'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    static associate(models) {
      UserData.belongsTo(models.User);
    }
  }

  UserData.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please input your full name'}
      }},
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please input your location!'}
      }},
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please input your phone number!'}
      }},
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
}