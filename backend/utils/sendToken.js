// creating token and saving in cokkies

const sendToken = (user, statusCode, res) => {
  //options for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

modules.exports = sendToken;
