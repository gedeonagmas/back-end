const signupModel = require("./../backend/models/signupModels");

const getAllUsers = async (req, res) => {
  try {
    const data = await signupModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUsersHandler = async (req, res) => {
  try {
    const data = await signupModel.deleteOne({ _id: req.query.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getAllUsers, deleteUsersHandler };
