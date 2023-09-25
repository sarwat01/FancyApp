const AppError = require("./../utils/appError");
const httpStatus = require("http-status");
const mongoose = require('mongoose');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const routeValidateAPI = (err) => {
  const message = `Duplicate field value ! Please use another value!`;
  return new AppError(message, 400);
  
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value ! Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const invalidId = (err) => {
  const message = `Invalid id of data. ${errors.join(". ")}`;
  return new AppError(message, 404);
};


const handleJWTError = err => new AppError('invalid token. please login again !',401)

const handleJWTExpireError= err => new AppError('your token has expired please login again !',401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, 
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
   console.log(err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  /* console.log(err); */
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
  
    let error = { ...err };
   
     if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError(error);
    if (err.name === "TokenExpiredError") error = handleJWTExpireError(error);

    sendErrorProd(error, res);
  }
};
