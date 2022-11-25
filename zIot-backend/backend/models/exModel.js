const mongoose = require("./../mongodb");

const exSchema = mongoose.Schema({
  size: String,
});
const exModel = mongoose.model("fuck", exSchema);
module.exports = exModel;
