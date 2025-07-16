const airportService = require("../../services/airport-service");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const { message } = require("../../utils/common/success-response");
const { StatusCodes } = require("http-status-codes");
const createAirport = async function createAirport(req, res) {
  try {
    const airport = await airportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId
    });
    SuccessResponse.message = "airport created successfully";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAirport = async function getAirport(req, res) {
  try {
    const airport = await airportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAllAirport = async function getAllAirport(req, res) {
  try {
    const airports = await airportService.getAllAirport();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const deleteAirport = async function deleteAirport(req, res) {
  try {
    await airportService.deleteAirport(req.params.id);
    SuccessResponse.message = "Successfully deleted the airport";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const updateAirport = async function updateAirport(req, res) {
  try {
    const response = await airportService.updateAirport(
      req.params.id,
      req.body
    );
    SuccessResponse.message = "Successfully updated the airport data";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

module.exports = {
  createAirport,
  getAirport,
  getAllAirport,
  deleteAirport,
  updateAirport,
};
