const mongoose = require("./../mongodb");

const blogsSchema = mongoose.Schema({
  name: String,
  email: String,
  time: String,
  title: String,
  description: String,
  blogsPhoto: [Object],
  accept: Boolean,
});

const blogsModel = mongoose.model("blogs", blogsSchema);
module.exports = blogsModel;
