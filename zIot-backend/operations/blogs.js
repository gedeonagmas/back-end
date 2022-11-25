const blogsModel = require("./../backend/models/blogsModel");
const {pathHandler} = require("./projects");

const blogsCreateHandler = async (req, res) => {
  try {
    const data = await blogsModel.create({
      name: req.body.name,
      email: req.body.email,
      time: req.body.time,
      title: req.body.title, 
      description: req.body.description,
      blogsPhoto: {
        path: pathHandler(req.files.blo[0].path),
      },
      time:req.body.time,
      accept: false,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//get requested blogs
const getAllBlogsRequestHandler = async (req, res) => {
  try {
    const data = await blogsModel.find({ accept: false });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get accepted blogs
const getAllAcceptedBlogstHandler = async (req, res) => {
  try {
    const data = await blogsModel.find({ accept: true });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//accept single blogs handler
const acceptNewBlogsHandler = async (req, res) => {
  try {
    const data = await blogsModel.updateOne(
      { _id: req.query.ids },
      {
        $set: { accept: true },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//delete blogs handler
const deleteBlogsHandler = async (req, res) => {
  try {
    const data = await blogsModel.deleteOne({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  blogsCreateHandler,
  getAllBlogsRequestHandler,
  getAllAcceptedBlogstHandler,
  acceptNewBlogsHandler,
  deleteBlogsHandler,
};
