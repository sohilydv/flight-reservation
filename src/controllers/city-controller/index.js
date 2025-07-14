const cityService = require("../../services/city-service");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const { message } = require("../../utils/common/success-response");
const { StatusCodes } = require("http-status-codes");
const createCity = async function createCity(req, res) {
  try {
    const city = await cityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.message = "city created successfully";
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getCity = async function getCity(req, res) {
  try {
    const city = await cityService.getCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAllCity = async function getAllCity(req, res) {
  try {
    const citys = await cityService.getAllCities();
    SuccessResponse.data = citys;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const deleteCity = async function deleteCity(req, res) {
  try {
    await cityService.deleteCity(req.params.id);
    SuccessResponse.message = "Successfully deleted the city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const updateCity = async function updateCity(req, res) {
  try {
    const response = await cityService.updateCity(req.params.id, req.body);
    SuccessResponse.message = "Successfully updated the city data";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

module.exports = {
  createCity,
  getCity,
  getAllCity,
  deleteCity,
  updateCity,
};
