const mongoose = require("mongoose");
// const mongodbUrl = "mongodb://localhost:27017/exercise";
const mongourl =
  "mongodb+srv://gedeon:zWTqCD4FYsf4ut3L@cluster0.rhayeki.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongourl, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("### database connected successfully ###");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
