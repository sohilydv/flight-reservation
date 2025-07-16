const Airport  = require("../models").Airport; // ✅ Import from centralized model init
const AirportRepository = require("../repository/airport-repository");
const { StatusCodes } = require("http-status-codes");
const airportRepository = new AirportRepository(Airport);
const AppError = require("../utils/errors/app-error");
async function createAirport(airportData) {
  try {
    const response = await airportRepository.create(airportData);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      console.log(explaination);
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const response = await airportRepository.get(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("No airport found", error.statusCode);
    }
    throw new AppError(
      "Error occured while fetching data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirport() {
  try {
    const response = await airportRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured while fetching all airport data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested airport to delete",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while deleting the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
    //TODO add unique update
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested airport to update",
        error.statusCode
      );
    }else if (error.name == "SequelizeUniqueConstraintError") {
      throw new AppError("airport with this code already exists, it must be unique", StatusCodes.CONFLICT);
    }
    throw new AppError(
      "Error occured while upadting the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAllAirport,
  deleteAirport,
  updateAirport,
};
