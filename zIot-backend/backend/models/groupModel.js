const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  groupName: { type: String },
  flag: { type: String },
  ownersName: { type: String },
  ownersId: { type: String },
  groupPro: { type: [Object] },
  members: { type: [String] },
  requests: { type: [String] },
});
const groupModel = mongoose.model("groups", groupSchema);

module.exports = groupModel;
