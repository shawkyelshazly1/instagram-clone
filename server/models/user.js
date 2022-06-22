const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: {
      type: String,
      trim: true,
      default: "https://tinyurl.com/5n9bhd75",
    },
    tokenVersion: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
