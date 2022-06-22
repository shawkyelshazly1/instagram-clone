const ajvInstance = require("./ajv-instance");

// userRegisterSchema
const userRegisterAjvSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "username",
    "password",
    "email",
    "confirmPassword",
  ],
  allOf: [
    {
      properties: {
        firstName: { type: "string", minLength: 3 },
        lastName: { type: "string", minLength: 3 },
        username: { type: "string", minLength: 3 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6, maxLength: 12 },
        confirmPassword: { const: { $data: "1/password" } },
      },
      additionalProperties: false,
    },
  ],

  errorMessage: {
    properties: {
      firstName: "First Name must be a String min chars of 3.",
      lastName: "Last Name must be a String min chars of 3.",
      username: "Username must be a String min chars of 3.",
      email: "Email should be a valid email address",
      password: "Password should be withn 6 & 12 chars",
      confirmPassword: "should match Password field",
    },
  },
};

const userLoginAjvSchema = {
  type: "object",
  required: ["username", "password"],
  allOf: [
    {
      properties: {
        username: { type: "string", minLength: 3 },
        password: { type: "string", minLength: 6, maxLength: 12 },
      },
      additionalProperties: false,
    },
  ],

  errorMessage: {
    properties: {
      username: "Username must be a String min chars of 3.",
      password: "Password should be withn 6 & 12 chars",
    },
  },
};

const ajvRegisterDataValidation = ajvInstance.compile(userRegisterAjvSchema);
const ajvLoginDataValidation = ajvInstance.compile(userLoginAjvSchema);

module.exports = { ajvRegisterDataValidation, ajvLoginDataValidation };
