const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const City = require("../models").City;
const CityRepository = require("../repository").CityRepository;

const cityRepository = new CityRepository(City);

async function createCity(data) {
  try {
    const response = await cityRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    } else if (error.name == "SequelizeUniqueConstraintError") {
      throw new AppError("cityName already exists, it must be unique", StatusCodes.CONFLICT);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const response = await cityRepository.get(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("No city found", error.statusCode);
    }
    throw new AppError(
      "Error occured while fetching data of the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCities() {
  try {
    const response = await cityRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Error occured while fetching all city data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested city to delete",
        error.statusCode
      );
    }
    throw new AppError(
      "Error occured while deleting the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "couldn't found requested city to update",
        error.statusCode
      );
    }else if (error.name == "SequelizeUniqueConstraintError") {
      throw new AppError("cityName already exists, it must be unique", StatusCodes.CONFLICT);
    }
    throw new AppError(
      "Error occured while upadting the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createCity, getCity, getAllCities, deleteCity, updateCity };
