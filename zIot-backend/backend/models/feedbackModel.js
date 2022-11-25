const mongoose = require("./../mongodb");

const feedbackSchema = mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
  date: String,
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports = feedbackModel;