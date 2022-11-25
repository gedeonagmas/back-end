const mongoose = require("./../mongodb");

const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String },
    // pic: { type: String },
  },
  {
    timestampa: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
