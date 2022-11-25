const adminAuthModel = require("./../backend/models/adminAuthModel");

const adminAuthGetHandler = async (req, res) => {
  try {
    const data = await adminAuthModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const adminAuthCreateHandler = async (req, res) => {
  try {
    const data = await adminAuthModel.create({
      userType: "admin",
      name: "admin",
      password: 123,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const adminAuthUpdateHandler = async (req, res) => {
  try {
    const data = await adminAuthModel.updateOne(
      { userType: "admin" },
      {
        $set: { name: req.body.name, password: req.body.password },
      }
    );
    res.status(200).redirect('http://localhost:3000/admin/auth');
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  adminAuthCreateHandler,
  adminAuthGetHandler,
  adminAuthUpdateHandler,
};
