const CrudRepository = require("./crud-repository");

const city = require("../models").City;

class CityRepository extends CrudRepository {
  constructor(city) {
    super(city);
  }
}

module.exports = CityRepository;
