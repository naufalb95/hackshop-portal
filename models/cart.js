'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.User, { foreignKey: 'id' });
      Cart.hasMany(models.Item, { foreignKey: 'id' });
    }
  }

  Cart.init(
    {
      UserId: DataTypes.INTEGER,
      ItemId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  );

  return Cart;
};
