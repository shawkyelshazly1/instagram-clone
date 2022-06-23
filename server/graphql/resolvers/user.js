const { UserInputError } = require("apollo-server-express");
const { isAuthenticated } = require("../../middlewares/auth");
const following = require("../../models/following");
const user = require("../../models/user");

const userResolver = {
  Query: {
    // loading user profile
    async loadUserProfile(_, { username }, ctx) {
      await isAuthenticated(ctx);

      // validate user exists
      const userFound = await user.findOne({ username });
      if (!userFound) {
        throw new UserInputError("User not found!");
      }
      return userFound;
    },

    //load current user
    async currentUser(_, __, ctx) {
      await isAuthenticated(ctx);
      const userFound = await user.findById(ctx.req.payload.userId);
      return userFound;
    },
  },

  Mutation: {
    async followOrUnfollowUser(_, { username }, ctx) {
      await isAuthenticated(ctx);

      // validate user exists
      const userFound = await user.findOne({ username });
      if (!userFound) {
        throw new UserInputError("User not found!");
      }

      // validate selected user not same as logged in
      if (userFound.id === ctx.req.payload.userId) {
        throw new UserInputError("Not Allowed!");
      }

      // check if following user already or not to determine the action follow /OR/ unfollow
      const followFound = await following.findOne({
        follower: ctx.req.payload.userId,
        followee: userFound.id,
      });

      if (!followFound) {
        const newFollower = new following({
          follower: ctx.req.payload.userId,
          followee: userFound.id,
        });

        await newFollower.save();
      } else {
        const followToDelete = await following.findOneAndDelete({
          follower: ctx.req.payload.userId,
          followee: userFound.id,
        });
      }

      return true;
    },
  },
};

module.exports = userResolver;
