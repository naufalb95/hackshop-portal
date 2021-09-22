'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    
    static associate(models) {
      // define association here
      UserData.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  UserData.init({
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
};