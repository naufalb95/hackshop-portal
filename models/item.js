'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.User);
      Item.belongsToMany(models.User, { through: 'Carts' });
    }

    static filterIsActive(data) {
      let arr = [];
      data.forEach((element) => {
        if (element.stock < 1) {
          element.isActive = false;
        }
        if (element.isActive === true) {
          arr.push(element);
        }
      });
      return arr;
    }
    get formatPrice() {
      return this.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      });
    }
  }

  Item.init(
    {
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
      modelName: 'Item'
    }
  );

  return Item;
};
