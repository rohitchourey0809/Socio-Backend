require("dotenv").config();

const sendToken = (user, res) => {
  const token = user.generateJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", token, options);
  return token;
};

module.exports.sendToken = sendToken;
