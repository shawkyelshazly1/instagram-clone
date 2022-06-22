const { Schema, model, SchemaTypes } = require("mongoose");

const commentSchema = new Schema(
  {
    content: { type: String, trim: true, required: true },
    postId: { type: SchemaTypes.ObjectId, required: true },
    authorId: { type: SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
