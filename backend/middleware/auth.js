const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData._id);
  next();
  console.log(token);
});

// exports.authorizedRoles = (...roles) => {
//   return (req, res, next) => {
//     // Check if req.user exists and has a valid role
//     if (!req.user || !req.user.role) {
//       return next(
//         new ErrorHandler("Role not found. Please log in again.", 403)
//       );
//     }

//     // Check if the user's role is authorized
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user.role} is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
