'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.User);
      Item.belongsToMany(models.User, { through: 'Carts' });
    }

    get formatPrice() {
      return this.price.toLocaleString("id-ID", {style: "currency", currency:"IDR"})
    }
  }

  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  },
  {
    hooks: {
      beforeCreate: (instance) => {
        instance.isActive = true;
      }
    },
    sequelize,
    modelName: 'Item',
  });
  return Item;
}