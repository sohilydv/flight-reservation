"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        sourceKey: "id",
        as: "city",
        onDelete: "CASCAD", // TODO
        onUpdate: "CASCAD", // TODO
      });
      this.hasMany(models.Flight, {
        foreignKey: "departureAirportId",
        sourceKey: "code"
      });
      this.hasMany(models.Flight, {
        foreignKey: "arrivalAirportId",
        sourceKey: "code"
      });
    }
  }
  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, // to to hit request with new id which doesn't exist in table yet
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
