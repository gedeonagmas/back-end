const applyModel = require("./../backend/models/applyModel");
const { pathHandler } = require("./projects");
const email=require('./nodemailer');

const applyPostHandler = async (req, res) => {
  try {
    const data = await applyModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      campusName: req.body.campusName,
      department: req.body.department,
      year: req.body.year,
      description: req.body.description,
      gender: req.body.gender,
      letter: {
        path: pathHandler(req.files.apply[0].path),
      },
      accept: req.body.accept,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//get apply request
const getApplyRequestHandler = async (req, res) => {
  try {
    const data = await applyModel.find({ accept: false });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//accept apply request
const acceptApplyRequestHandler = async (req, res) => {
  try {
    const data = await applyModel.updateOne(
      { _id: req.query.ids },
      {
        $set: { accept: true },
      }
    );
    email({
      to:req.query.emails,
      subject:'apparent request accepted',
      text:req.query.texts,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get apply request
const deleteApplyUsersHandler = async (req, res) => {
  try {
    const data = await applyModel.deleteOne({ _id: req.query.ids });
    email({
      to:req.query.email,
      subject:'apparent request rejected',
      text:req.query.texts,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get apply accepted students data
const getApplyAcceptedStudentsHandler = async (req, res) => {
  try {
    const data = await applyModel.find({ accept: true });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  applyPostHandler,
  getApplyRequestHandler,
  getApplyAcceptedStudentsHandler,
  acceptApplyRequestHandler,
  deleteApplyUsersHandler,
};
