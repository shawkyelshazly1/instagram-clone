const { Schema, model, SchemaTypes } = require("mongoose");

const postSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    caption: { type: String, required: true, trim: true },
    authorId: { type: SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
