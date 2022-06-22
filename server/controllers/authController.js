const jsonWebToken = require("jsonwebtoken");
const {
  sendRefreshToken,
  generateRefreshToken,
  generateAccessToken,
} = require("../middlewares/auth");
const User = require("../models/user");

// refreshToken controller
async function refreshTokenController(req, res) {
  const refreshToken = req.cookies.jid;

  if (!refreshToken) {
    return res.send({ status: false, accessToken: "" });
  }

  let payload = "";

  try {
    payload = jsonWebToken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    return res.send({ status: false, accessToken: "" });
  }

  // if valid token validate user
  const user = await User.findById(payload.userId);

  if (!user) {
    return res.send({ status: false, accessToken: "" });
  } else if (payload.tokenVersion !== user.tokenVersion) {
    return res.send({ status: false, accessToken: "" });
  }

  await sendRefreshToken(res, await generateRefreshToken(user));

  return res.send({
    status: true,
    accessToken: await generateAccessToken(user),
  });
}

module.exports = refreshTokenController;
