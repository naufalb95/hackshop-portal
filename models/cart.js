'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
   
    static associate(models) {
      // define association here
      Cart.hasMany(models.User, {foreignKey: 'UserId'})
      Cart.hasMany(models.Item, {foreignKey: 'ItemId'})
    }
  };
  User.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};