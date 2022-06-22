const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

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

module.exports = { registerUser, loginUser };
