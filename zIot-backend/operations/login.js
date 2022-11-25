const signupModel = require("./../backend/models/signupModels");
const login = async (req, res) => {
  try {
    const data = await signupModel.find({ userName: req.query.name });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = login;
