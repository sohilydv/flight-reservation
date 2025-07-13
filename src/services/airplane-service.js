const { Airplane } = require("../models"); // ✅ Import from centralized model init
const AirplaneRepository = require("../repository/airplane-repository");
const { StatusCodes } = require("http-status-codes");
const airplaneRepository = new AirplaneRepository(Airplane);
const AppError = require("../utils/errors/app-error");
async function createAirplane(airplaneData) {
  try {
    const response = await airplaneRepository.create(airplaneData);
    return response;
  } catch (error) {
    console.log(error)
    if (error.name == 'SequelizeValidationError') {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });  
      console.log(explaination);
      throw new AppError(
        explaination,
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
        "Cannot create a new airplane object",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
  }
}

async function getAirplane(id) {
  try {
    const response = await airplaneRepository.get(id);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getAllAirplane() {
  try {
    const response = await airplaneRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { createAirplane, getAirplane, getAllAirplane };
