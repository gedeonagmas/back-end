const filesModel = require("../backend/models/filesModel");
const { size, pathHandler } = require("./../operations/projects");

const typeHandler = (val) => {
  const a = val.split("/");
  return a[0];
};
const filePostHandler = async (req, res) => {
  try {
    const data = await filesModel.create({
      messageType: req.body.messageType,
      chatId: req.body.chatId,
      sender: req.body.sender,
      time: req.body.time,
      fileDescription: req.body.fileDescription,
      fileName: req.files.fileUpload[0].originalname,
      type: typeHandler(req.files.fileUpload[0].mimetype),
      path: pathHandler(req.files.fileUpload[0].path),
      size: size(req.files.fileUpload[0].size),
    });
    res.status(200).send(data);
  } catch (err) {
    console.info(err);
    res.status(500).send(err.message);
  }
};

//file get handler
const fileGetHandler = async (req, res) => {
  try {
    const data = await filesModel.find({ chatId: req.query.ids });
    res.status(200).send(data);
    //console.log(data, "file get");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

//file delete handler
const fileDeleteHandler = async (req, res) => {
  try {
    const data = await filesModel.deleteMany({ chatId: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { filePostHandler, fileGetHandler, fileDeleteHandler };
