const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
} = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const validateRequest = async function validateRequest(req, res, next) {
  if (req.body.modelNumber == null) {
    ErrorResponse.error = new AppError('invalid request, modelNumber is not present', StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }else if(req.body.modelNumber == ""){
    ErrorResponse.error = new AppError("modelNumber can't be empty", StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next()
}

module.exports = validateRequest;
