const flightService = require("../../services/flight-service");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../utils/errors/app-error");
const createFlight = async function createFlight(req, res) {
  try {
    const flight = await flightService.createFlight({
      airplaneId: req.body.airplaneId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureAirportId: req.body.departureAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      totalSeats: req.body.totalSeats,
      boardingGate: req.body.boardingGate
    });
    SuccessResponse.message = "flight created successfully";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};


const getFlight = async function getFlight(req, res) {
  try {
    const flight = await flightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAllFlight = async function getAllFlight(req, res) {
  try {
    const flights = await flightService.getAllFlight(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log("error occured: " + error.name)
    console.log("error response: "+ ErrorResponse + ", error.statusCode" + error.statusCode)
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const deleteFlight = async function deleteFlight(req, res) {
  try {
    await flightService.deleteFlight(req.params.id);
    SuccessResponse.message = "Successfully deleted the flight";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const updateFlight = async function updateFlight(req, res) {
  try {
    const response = await flightService.updateFlight(
      req.params.id,
      req.body
    );
    SuccessResponse.message = "Successfully updated the flight data";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

module.exports = {
  createFlight,
  getFlight,
  getAllFlight,
  deleteFlight,
  updateFlight,
};
