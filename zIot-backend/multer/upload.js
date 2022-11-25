const multer = require("multer");

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "./src/iotUploads");
  },
  filename: (res, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-"));
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "audio/mp3"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  filter,
});

module.exports = upload;
