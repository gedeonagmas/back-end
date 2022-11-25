const { size,pathHandler } = require("./projects");
const { chatCreateModel } = require("../backend/schema");
const chatUserUpload = async (req, res) => {
  try {
    const data = await chatCreateModel.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      phone: req.body.phone,
      password: req.body.password,
      status: req.body.status,
      time: req.body.time,
      proPic: {
        originalName: req.files.proPic[0].originalname,
        currentName: req.files.proPic[0].filename,
        path: pathHandler(req.files.proPic[0].path),
        size: size(req.files.proPic[0].size),
      },
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};
//##################### get single chat user #####################
const chatUserGet = async (req, res) => {
  try {
    console.log(req.query);
    const data = await chatCreateModel.find({ userName: req.query.name });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

//###################### get all chat users #####################
const getAllUserHandler = async (req, res) => {
  try {
    console.log(req.query);
    const data = await chatCreateModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};
//#################### update user status ########################

const userStatusUpdateHandler = async (req, res) => {
  try {
    const data = await chatCreateModel.updateOne(
      { userName: req.query.name },
      {
        $set: { status: "online" },
      }
    );
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  chatUserUpload,
  chatUserGet,
  getAllUserHandler,
  userStatusUpdateHandler,
};
