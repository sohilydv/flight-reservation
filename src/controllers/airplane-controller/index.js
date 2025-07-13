const airplaneService = require("../../services/airplane-service");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const { message } = require("../../utils/common/success-response");
const AppError = require("../../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const createAirplane = async function createAirplane(req, res) {
  try {
    const airplane = await airplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.message = "airplane created successfully";
    SuccessResponse.data = airplane;
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAirplane = async function getAirplane(req, res) {
  try {
    const airplane = await airplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "error occured while creating airplane";
    ErrorResponse.error = error;
    return res.json(ErrorResponse);
  }
};

const getAllAirplane = async function getAllAirplane(req, res) {
  try {
    const airplanes = await airplaneService.getAllAirplane();
    SuccessResponse.data = airplane;
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "error occured while creating airplane";
    ErrorResponse.error = error;
    return res.json(ErrorResponse);
  }
};

module.exports = { createAirplane, getAirplane, getAllAirplane };
