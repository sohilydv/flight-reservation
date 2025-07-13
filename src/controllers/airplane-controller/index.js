const airplaneService = require("../../services/airplane-service");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const { message } = require("../../utils/common/success-response");
const { StatusCodes } = require("http-status-codes");
const createAirplane = async function createAirplane(req, res) {
  try {
    const airplane = await airplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.message = "airplane created successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAirplane = async function getAirplane(req, res) {
  try {
    const airplane = await airplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const getAllAirplane = async function getAllAirplane(req, res) {
  try {
    const airplanes = await airplaneService.getAllAirplane();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const deleteAirplane = async function deleteAirplane(req, res) {
  try {
    await airplaneService.deleteAirplane(req.params.id);
    SuccessResponse.message = "Successfully deleted the airplane";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

const updateAirplane = async function updateAirplane(req, res) {
  try {
    const response = await airplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    SuccessResponse.message = "Successfully updated the airplane data";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
};

module.exports = {
  createAirplane,
  getAirplane,
  getAllAirplane,
  deleteAirplane,
  updateAirplane,
};
