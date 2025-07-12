const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
} = require("http-status-codes");

const validateRequest = async function validateRequest(req, res) {
  if (req.body.modelNumber == null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "invalid request modelNumber is not sent",
      success: false,
      error: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data: [],
    });
  }else if(req.body.modelNumber == ""){
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "modelNumber can't be empty",
      success: false,
      error: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data: [],
    });
  }
  next()
}

module.exports = validateRequest;
