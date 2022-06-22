const {
  valdiateRegisterInput,
  validateLoginInput,
} = require("../../middlewares/ajvValidation");
const {
  registerUser,
  loginUser,
  sendRefreshToken,
  generateRefreshToken,
  generateAccessToken,
} = require("../../middlewares/auth");

const authResolver = {
  Mutation: {
    // register mutation
    async register(_, registerDataObj) {
      await valdiateRegisterInput(registerDataObj);
      await registerUser(registerDataObj);
      return true;
    },

    // login mutation
    async login(_, loginDataObj, { res }) {
      await validateLoginInput(loginDataObj);
      const user = await loginUser(loginDataObj);

      await sendRefreshToken(res, await generateRefreshToken(user));

      return {
        accessToken: await generateAccessToken(user),
        user,
      };
    },

    //logout mutation
    async logout(_, __, { req, res }) {
      sendRefreshToken(res, "");
      return true;
    },
  },
};

module.exports = authResolver;
