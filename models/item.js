'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {foreignKey: 'UserId'})
      Item.belongsToMany(models.User, {through: 'Carts'})
    }
  };
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  },
  {
    hooks: {
      beforeCreate: (instance) => {
        instance.isActive = true
      }
    },
    sequelize,
    modelName: 'Item',
  });
  return Item;
};