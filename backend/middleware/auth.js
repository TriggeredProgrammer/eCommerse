const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  // Ensure token is present
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  
  try {
    // Decode token to get user ID
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id); // Ensure it matches the default field used

    // Confirm if user exists
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token, please login again", 401));
  }
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    // Ensure req.user exists and role is valid
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user ? req.user.role : "undefined"} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
