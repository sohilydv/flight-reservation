"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Arrival Airport association
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport", // alias 
        targetKey: "code",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Departure Airport association
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport", // different alias for clarity in same model
        targetKey: "code",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Airplane association
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplaneDetail", // alias for airplane
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Flight.init(
    {
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
