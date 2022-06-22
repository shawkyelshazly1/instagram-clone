const { Schema, SchemaTypes, model } = require("mongoose");

const postLikeSchema = new Schema({
  authorId: { type: SchemaTypes.ObjectId, required: true },
  postId: { type: SchemaTypes.ObjectId, required: true },
});

module.exports = model("PostLike", postLikeSchema);
