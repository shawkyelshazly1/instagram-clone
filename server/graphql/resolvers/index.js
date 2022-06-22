const { isAuthenticated } = require("../../middlewares/auth");
const following = require("../../models/following");
const authResolver = require("./auth");
const postResolver = require("./post");
const userResolver = require("./user");

const resolvers = {
  User: {
    // followers count query
    followersCount: async (parent, _, __) => {
      const followersCount = await following.countDocuments({
        followee: parent._id,
      });
      return followersCount;
    },

    // followings count query
    followingsCount: async (parent, _, __) => {
      const followingsCount = await following.countDocuments({
        follower: parent._id,
      });
      return followingsCount;
    },

    //if user followed or not
    followed: async (parent, _, ctx) => {
      const followed = await following.findOne({
        follower: ctx.req.payload.userId,
        followee: parent._id,
      });

      if (!followed) return false;
      return true;
    },
  },
  Query: {
    async testQuery(_, __, ctx) {
      await isAuthenticated(ctx);
      return "Hello from GraphQL";
    },
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

module.exports = resolvers;
