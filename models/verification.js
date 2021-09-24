'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Verification extends Model {
    static associate(models) {
      Verification.belongsTo(models.User);
    }
  }

  Verification.init(
    {
      verification: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Verification'
    }
  );

  return Verification;
};
