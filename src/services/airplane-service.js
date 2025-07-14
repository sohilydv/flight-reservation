const Airplane  = require("../models").Airplane; // ✅ Import from centralized model init
const AirplaneRepository = require("../repository/airplane-repository");
const { StatusCodes } = require("http-status-codes");
const airplaneRepository = new AirplaneRepository(Airplane);
const AppError = require("../utils/errors/app-error");
async function createAirplane(airplaneData) {
  try {
    const response = await airplaneRepository.create(airplaneData);
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
      "Cannot create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const response = await airplaneRepository.get(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("No airplane found", error.statusCode);
    }
    throw new AppError(
      "Error occured while fetching data of the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplane() {
  try {
    const response = await airplaneRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured while fetching all airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested airplane to delete",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while deleting the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested airplane to update",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while upadting the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplane,
  getAllAirplane,
  deleteAirplane,
  updateAirplane,
};
