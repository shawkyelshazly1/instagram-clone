const Ajv = require("ajv"),
  addFormats = require("ajv-formats"),
  ajvErrors = require("ajv-errors");

const ajvInstance = new Ajv({ allErrors: true, $data: true });
addFormats(ajvInstance);
ajvErrors(ajvInstance);

module.exports = ajvInstance;
