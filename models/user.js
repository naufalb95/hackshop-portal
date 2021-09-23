'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserData)
      User.hasMany(models.Item)
      User.belongsToMany(models.Item, {through: 'Carts'})
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(instance.password, salt);
        instance.password = hashedPassword;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
}