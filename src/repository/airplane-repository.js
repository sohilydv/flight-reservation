const { Airplane } = require("../models");
const CrudRepository = require('./crud-repository.js');
class AirplaneRepository extends CrudRepository {
  constructor(Airplane) {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
