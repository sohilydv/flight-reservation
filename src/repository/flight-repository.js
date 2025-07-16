const models = require("../models");
const Airplane = models.Airplane;
const CrudRepository = require("./crud-repository.js");
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
}

module.exports = FlightRepository;