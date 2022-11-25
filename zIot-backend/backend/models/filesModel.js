const mongoose = require("./../mongodb");

const filesSchema = mongoose.Schema({
  messageType: String,
  chatId: String,
  time: String,
  sender: String,
  fileName: String,
  fileDescription: String,
  path: String,
  type: String,
  size: String,
});

const filesModel = mongoose.model("files", filesSchema);

module.exports = filesModel;
