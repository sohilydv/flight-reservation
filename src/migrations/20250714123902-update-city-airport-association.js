"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("airports", {
      fields: ["cityId"], // The column in airports table
      type: "foreign key",
      name: "fk_airports_city", // Custom name for the FK constraint
      references: {
        table: "Cities", // Referenced table name
        field: "id", // Referenced column (usually PK)
      },
      onDelete: "CASCADE", // Delete airport if city is deleted
      onUpdate: "CASCADE", // Update airport's cityId if city.id is updated
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("airports", "fk_airports_city");
  },
};
