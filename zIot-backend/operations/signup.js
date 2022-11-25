const signupModel = require("./../backend/models/signupModels");
const { size, pathHandler } = require("./projects");
// const pathHandler = (val) => {
//   const a = val.split("\\");
//   return `iotUploads\\${a[2]}`;
// };

const signupHandler = async (req, res) => {
  try {
    const data = await signupModel.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      profilePic: {
        originalName: req.files.profilePic[0].originalname,
        currentName: req.files.profilePic[0].filename,
        path: pathHandler(req.files.profilePic[0].path),
        size: size(req.files.profilePic[0].size),
      },
      status: req.body.status,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//get single user
const getSingleUser = async (req, res) => {
  try {
    const data = await signupModel.find({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { signupHandler, getSingleUser };
