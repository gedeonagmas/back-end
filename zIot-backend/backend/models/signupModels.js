const mongoose = require("./../mongodb");

const signupSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String },
    profilePic: { type: [Object] },
  },
  {
    timestampa: true,
  }
);

const signupModel = mongoose.model("users", signupSchema);
module.exports = signupModel;
