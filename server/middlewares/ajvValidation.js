const consola = require("consola"),
  {
    ajvLoginDataValidation,
    ajvRegisterDataValidation,
  } = require("../schema/user"),
  { UserInputError } = require("apollo-server-express");

// validate user register
async function valdiateRegisterInput(registerData) {
  const valid = ajvRegisterDataValidation(registerData);
  if (!valid) {
    ajvRegisterDataValidation.errors.forEach((error) => {
      throw new UserInputError(error.message);
    });
  } else {
    consola.success("No Errors");
  }
}

async function validateLoginInput(loginData) {
  const valid = ajvLoginDataValidation(loginData);
  if (!valid) {
    ajvLoginDataValidation.errors.forEach((error) => {
      throw new UserInputError(error.message);
    });
  } else {
    consola.success("No Errors");
  }
}

module.exports = { valdiateRegisterInput, validateLoginInput };
