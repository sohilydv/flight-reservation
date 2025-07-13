"use strict";
const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "Air976",
        capacity: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "Air1100",
        capacity: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Airplanes", {
      modelNumber: {
        [Op.eq]: "Air976",
      },
    });
  },
};
/*
commands to seed: npx sequelize seed:generate --name add-airplane
to seed all: npx sequelize db:seed:all
to seed undo: npx sequelize db:seed:undo
*/