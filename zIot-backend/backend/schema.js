const mongoose = require("./mongodb");

const projectsSchema = new mongoose.Schema({
  projects: [Object],
  teams: [Object],
  materials: [Object],
  feutureProjects: [Object],
  accept: Boolean,
  ack: String,
  title: String,
  time: String,
  times: Number,
});

const materialSchema = new mongoose.Schema({
  image: [Object],
  name: String,
  amount: String,
});
//chat create user schema
const chatCreateSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  userName: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
  },
  time: {
    type: String,
  },
  proPic: {
    type: [Object],
  },
});
//####################### message info #########################

//########################## message exercise schema ######################
//models
const projectsModel = mongoose.model("projects", projectsSchema);
const materialModel = mongoose.model("material", materialSchema);
const chatCreateModel = mongoose.model("chatUserInfo", chatCreateSchema);

module.exports = {
  projectsModel,
  materialModel,
  chatCreateModel,
};
