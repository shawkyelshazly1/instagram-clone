const { Schema, model, SchemaTypes } = require("mongoose");

const followingSchema = new Schema(
  {
    follower: { type: SchemaTypes.ObjectId, required: true, trim: true },
    followee: { type: SchemaTypes.ObjectId, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = model("Following", followingSchema);
