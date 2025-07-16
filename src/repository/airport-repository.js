const Airport = require("../models").Airport;
const CrudRepository = require("./crud-repository.js");
class AirportRepository extends CrudRepository {
  constructor(Airport) {
    super(Airport);
  }
}

module.exports = AirportRepository;