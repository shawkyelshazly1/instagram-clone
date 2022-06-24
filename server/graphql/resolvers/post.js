const { UserInputError, AuthenticationError } = require("apollo-server-core");
const { isAuthenticated } = require("../../middlewares/auth");
const comment = require("../../models/comment");
const following = require("../../models/following");
const post = require("../../models/post");
const Post = require("../../models/post");
const ObjectId = require("mongoose").Types.ObjectId;
const PostLike = require("../../models/postLike");
const { cloudinaryAPI } = require("../../utils/cloudinaryAPI");

const postResolver = {
  Query: {
    // load single post by Id
    async loadPost(_, { postId }, ctx) {
      await isAuthenticated(ctx);

      const postFound = await Post.findById(postId);

      if (!postFound) {
        throw new UserInputError("Post not found!");
      }

      return postFound;
    },

    // load user posts by userId
    async loadUserPosts(_, { userId }, ctx) {
      await isAuthenticated(ctx);

      const posts = await Post.find({ authorId: userId });

      return posts;
    },

    // load newsfeed posts based on followings
    async loadNewsfeed(_, __, ctx) {
      await isAuthenticated(ctx);

      // load folloings IDs
      let followingsIds = await following.aggregate([
        { $match: { follower: ObjectId(ctx.req.payload.userId) } },

        {
          $group: {
            _id: null,
            ids: { $push: "$followee" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);

      if (followingsIds.length === 0) return [];
      followingsIds = followingsIds[0].ids;

      const posts = await post
        .find({ authorId: { $in: followingsIds } })
        .sort({ createdAt: "descending" });

      return posts;
    },
  },
  Mutation: {
    // create new post
    async createPost(_, { image, caption }, ctx) {
      await isAuthenticated(ctx);

      console.log("started uploading");
      let imageURL = "";
      try {
        const cloudinaryRes = await cloudinaryAPI.uploader.upload(image, {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });
        imageURL = cloudinaryRes.secure_url;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to upload your image, something went wrong!");
      }

      const newPost = new Post({
        caption,
        image: imageURL,
        authorId: ctx.req.payload.userId,
      });

      await newPost.save();
      return newPost;
    },

    // delete post
    async deletePost(_, { postId }, ctx) {
      await isAuthenticated(ctx);

      const postFound = await Post.findById(postId);

      if (!postFound) {
        throw new UserInputError("Post not found!");
      } else if (postFound.authorId.toString() !== ctx.req.payload.userId) {
        throw new AuthenticationError("Not Authorized!");
      }

      await postFound.delete();

      // delete all likes related to post
      try {
        const deletedLikes = await PostLike.deleteMany({ postId });
        const deletedComments = await comment.deleteMany({ postId });
      } catch (error) {
        console.error(error);
      }

      return true;
    },

    // like or unlike post
    async likeorUnlikePost(_, { postId }, ctx) {
      await isAuthenticated(ctx);

      const postFound = await Post.findById(postId);

      if (!postFound) {
        throw new UserInputError("Post not found!");
      }

      const likeFound = await PostLike.findOne({
        authorId: ctx.req.payload.userId,
        postId,
      });

      if (likeFound) {
        await likeFound.delete();
      } else {
        const newPostLike = new PostLike({
          authorId: ctx.req.payload.userId,
          postId,
        });

        await newPostLike.save();
      }

      return postFound;
    },
  },
};

module.exports = postResolver;
