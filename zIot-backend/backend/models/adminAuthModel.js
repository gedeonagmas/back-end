const mongoose = require("./../mongodb");

const adminAuthSchema = new mongoose.Schema({
  userType: String,
  name: String,
  password: String,
});

const adminAuthModel = mongoose.model("adminAuth", adminAuthSchema);

module.exports = adminAuthModel;
