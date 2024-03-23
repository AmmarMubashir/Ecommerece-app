const User = require("../Model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.headers.authorization.split(" ")[1];
  // console.log("HIIII", token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decoded", decodedData);
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
