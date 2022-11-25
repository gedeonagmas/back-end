const groupModel = require("./../backend/models/groupModel");
const { size, pathHandler } = require("./projects");

const groupCreateHandler = async (req, res) => {
  try {
    const data = await groupModel.create({
      groupName: req.body.groupName,
      flag: req.body.flag,
      ownersName: req.body.ownersName,
      ownersId: req.body.ownersId,
      members: req.body.members,
      requests: [],
      groupPro: {
        originalName: req.files.groupPro[0].originalname,
        currentName: req.files.groupPro[0].filename,
        path: pathHandler(req.files.groupPro[0].path),
        size: size(req.files.groupPro[0].size),
      },
    });
    res.status(200).redirect("http://localhost:3000/real");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//group get
const groupGetHandler = async (req, res) => {
  try {
    const data = await groupModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//singel group handler
const singleGroupGetHandler = async (req, res) => {
  try {
    const data = await groupModel.find({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get own group
//singel group handler
const getOwnGroupHandler = async (req, res) => {
  try {
    const data = await groupModel.find({ ownersId: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//add group member handler
const addGroupMemberHandler = async (req, res) => {
  try {
    const data = await groupModel.updateOne(
      { _id: req.query.ids },
      {
        $set: {
          members: req.body.members,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//join request handler
const joinRequestHandler = async (req, res) => {
  try {
    const data = await groupModel.updateOne(
      { _id: req.query.ids },
      {
        $set: {
          requests: req.body.requests,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteGroupHandler = async (req, res) => {
  try {
    const data = await groupModel.deleteOne({ _id: req.query.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  groupCreateHandler,
  groupGetHandler,
  singleGroupGetHandler,
  getOwnGroupHandler,
  addGroupMemberHandler,
  joinRequestHandler,
  deleteGroupHandler,
};
