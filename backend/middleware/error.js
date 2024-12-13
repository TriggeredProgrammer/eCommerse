const { object } = require("webidl-conversions");
const ErrorHandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "casteError") {
    const message = `Resource not found. Invalid :  ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if(err.name==='JsonWebTokenError'){
    const message=`Json web token is invalid, try again`;
    err=new ErrorHandler(message,400);
  }
  // JWT EXPIRE Error
  if(err.name==='TokenExpireError'){
    const message=`Json web token is expired, try again`;
    err=new ErrorHandler(message,400);
  }

  res.status(err.statusCode).json({
    success: false,
    // message: err.stack,
    message: err.message,
  });
};
