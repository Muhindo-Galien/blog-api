const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const e = require("express");
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000){
    customError.msg='This email is already used, Please use another'
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
    return res.status(customError.statusCode).json({ msg: customError.msg });
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
