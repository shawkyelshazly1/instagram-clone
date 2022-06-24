const { isAuthenticated } = require("../../middlewares/auth");
const comment = require("../../models/comment");
const following = require("../../models/following");
const post = require("../../models/post");
const PostLike = require("../../models/postLike");
const User = require("../../models/user");
const authResolver = require("./auth");
const commentResolver = require("./comment");
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

    // user posts
    posts: async (parent, __, ctx) => {
      await isAuthenticated(ctx);

      const posts = await post.find({ authorId: parent._id });
      return posts;
    },
  },
  Post: {
    // post author
    author: async (parent, __, ctx) => {
      await isAuthenticated(ctx);
      const user = await User.findById(parent.authorId);
      return user;
    },

    //post likes count
    likesCount: async (parent, __, ctx) => {
      await isAuthenticated(ctx);
      const likesCount = await PostLike.countDocuments({ postId: parent._id });

      return likesCount;
    },

    // post liked or not
    liked: async (parent, __, ctx) => {
      await isAuthenticated(ctx);

      const likeFound = await PostLike.findOne({
        postId: parent._id,
        authorId: ctx.req.payload.userId,
      });

      if (likeFound) {
        return true;
      } else {
        return false;
      }
    },

    // postCommnets
    comments: async (parent, __, ctx) => {
      await isAuthenticated(ctx);

      const comments = await comment.find({ postId: parent._id });
      return comments;
    },

    // postComments Count
    commentsCount: async (parent, __, ctx) => {
      const commentsCount = await comment.countDocuments({
        postId: parent._id,
      });
      return commentsCount;
    },
  },
  Comment: {
    author: async (parent, __, ctx) => {
      await isAuthenticated(ctx);
      const user = await User.findById(parent.authorId);
      return user;
    },
    post: async (parent, __, ctx) => {
      await isAuthenticated(ctx);
      const postFound = await post.findById(parent.postId);
      return postFound;
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
    ...commentResolver.Mutation,
  },
};

module.exports = resolvers;
