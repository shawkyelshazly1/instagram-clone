const {
  valdiateRegisterInput,
  validateLoginInput,
} = require("../../middlewares/ajvValidation");
const { registerUser, loginUser } = require("../../middlewares/auth");

const authResolver = {
  Mutation: {
    // register mutation
    async register(_, registerDataObj) {
      await valdiateRegisterInput(registerDataObj);
      await registerUser(registerDataObj);
      return true;
    },

    // login mutation
    async login(_, loginDataObj) {
      await validateLoginInput(loginDataObj);
      const user = await loginUser(loginDataObj);
      return {
        accessToken: "asdsad",
        user,
      };
    },
  },
};

module.exports = authResolver;
