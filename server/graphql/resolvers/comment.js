const { UserInputError, AuthenticationError } = require("apollo-server-core");
const { isAuthenticated } = require("../../middlewares/auth");
const Comment = require("../../models/comment");
const post = require("../../models/post");

const commentResolver = {
  Mutation: {
    // add comment
    async addComment(_, { content, postId }, ctx) {
      await isAuthenticated(ctx);

      const postFound = await post.findById(postId);

      if (!postFound) {
        throw new UserInputError("Post not found!");
      }

      const newComment = new Comment({
        content,
        postId,
        authorId: ctx.req.payload.userId,
      });

      await newComment.save();
      return newComment;
    },

    //delete comment
    async deleteComment(_, { commentId }, ctx) {
      await isAuthenticated(ctx);

      const commentFound = await Comment.findById(commentId);

      if (!commentFound) {
        throw new UserInputError("Comment not found!");
      } else if (commentFound.authorId.toString() !== ctx.req.payload.userId) {
        throw new AuthenticationError("Not Authorized!");
      }

      await commentFound.delete();
      return true;
    },
  },
};

module.exports = commentResolver;
