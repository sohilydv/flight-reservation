const models = require("../models");
const Airplane = models.Airplane;
const CrudRepository = require("./crud-repository.js");
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');
class FlightRepository extends CrudRepository {
  constructor(Flight) {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await models.Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "airplaneDetail",
          required: true,
        },
        {
          model: models.Airport,
          as: "departureAirport",
          required: true,
          include: [
            {
              model: models.City,
              as: "city",
              required: true,
            },
          ],
        },
        {
          model: models.Airport,
          as: "arrivalAirport",
          required: true,
          include: [
            {
              model: models.City,
              as: "city",
              required: true,
            },
          ],
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await models.Flight.findByPk(flightId);
            if(+dec) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch(error) {
            await transaction.rollback();
            throw error;
        }
       
    }
}

module.exports = FlightRepository;