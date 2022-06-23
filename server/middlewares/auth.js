const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

// middleware function to register user info into DB
async function registerUser(userData) {
  let userFound = await User.findOne({ username: userData.username });

  if (userFound) {
    throw new UserInputError("Username Taken Already.");
  } else {
    userFound = await User.findOne({ email: userData.email });
    if (userFound) {
      throw new UserInputError("Email Registered Already.");
    }
  }

  let user = new User(userData);
  user.password = await bcryptjs.hash(userData.password, 10);
  await user.save();
}

// middleware to validate user login info
async function loginUser(userData) {
  const userFound = await User.findOne({ username: userData.username });

  if (!userFound) {
    throw new AuthenticationError("Username doesn't exist");
  } else {
    if (!(await bcryptjs.compareSync(userData.password, userFound.password))) {
      throw new AuthenticationError("Wrong Password");
    } else {
      return userFound;
    }
  }
}

// send refreshToken
async function sendRefreshToken(res, token) {
  res.cookie("jid", token, {
    httpOnly: true,
    // sameSite: "None",
    // scure: true,
    // path: "/refresh_token",
  });
}

// generate RefreshToken
async function generateRefreshToken(user) {
  const refreshToken = jsonWebToken.sign(
    {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
}

// generate AccessToken
async function generateAccessToken(user) {
  const accessToken = jsonWebToken.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
}

// validate if user is authenticated or not
async function isAuthenticated(ctx) {
  const authorization = ctx.req.headers["authorization"];

  if (!authorization) {
    throw new AuthenticationError("Not Authenticated");
  }

  try {
    const accessToken = authorization.split(" ")[1];

    const payload = jsonWebToken.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    ctx.req.payload = payload;
  } catch (error) {
    consola.error(error);
    throw new AuthenticationError("Not Authenticated");
  }
}

module.exports = {
  registerUser,
  loginUser,
  generateRefreshToken,
  generateAccessToken,
  sendRefreshToken,
  isAuthenticated,
};
