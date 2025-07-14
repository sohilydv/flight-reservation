const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
} = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function validateCreateCityRequest(req, res, next) {
  if (req.body.name == null) {
    ErrorResponse.error = new AppError(
      "invalid request, name is not present",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  } else if (req.body.name == "") { // todo remove from here add db lebel check
    ErrorResponse.error = new AppError(
      "name can't be empty",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function validateUpdateCityRequest(req, res, next) {
  if (req.body.name == null) {
    ErrorResponse.error = new AppError(
      "invalid request, name is not present to update",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  validateCreateCityRequest,
  validateUpdateCityRequest,
};
