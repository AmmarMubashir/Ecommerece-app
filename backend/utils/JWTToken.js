// creating token and saving in cokkies
// R2
const sendToken = (user, statusCode, res) => {
  // Options for cookie

  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 60 * 60 * 24 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
