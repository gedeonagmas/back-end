const mongoose = require("./../mongodb");

const applySchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  campusName: String,
  department: String,
  year: String,
  description: String,
  gender: String,
  letter: [Object],
  accept: Boolean,
});

const applyModel = mongoose.model("apply", applySchema);

module.exports = applyModel;
