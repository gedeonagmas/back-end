const exModel = require("./../backend/models/exModel");

const exPostHandler = async (req, res) => {
  try {
    const data = await exModel.create({
      path: req.files.path,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = exPostHandler;
