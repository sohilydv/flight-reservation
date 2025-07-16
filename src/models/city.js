'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Airport, {
        foreignKey : "cityId",
        sourceKey: "id"
      })
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      unique: true, // can be removed
      validate: {
        notEmpty: true
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};