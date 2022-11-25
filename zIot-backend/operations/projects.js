const { projectsModel } = require("../backend/schema");
const fs = require("fs");

const pathHandler = (val) => {
  const a = val.split("\\");
  return `${a[2]}`;
};
//##################################### size handler ######################################################
const size = (bytes) => {
  const arr = ["Bytes", "KB", "MB", "GB", "TB", "ZB"];
  let dp = 0;
  let counter = 0;
  let val = bytes.toString().split("");
  if (val.length === 4 || val.length === 5 || val.length === 6) {
    dp = 1;
  } else if (val.length === 7 || val.length === 8 || val.length === 9) {
    dp = 2;
  } else if (val.length === 10 || val.length === 11 || val.length === 12) {
    dp = 3;
  } else if (val.length === 13 || val.length === 14 || val.length === 15) {
    dp = 4;
  }
  let num = val.join("");
  let data = parseInt(num);
  for (let i = 0; i < dp; i++) {
    data = data / 1024;
    counter++;
  }
  return data.toFixed(2) + " " + arr[counter];
};
//################################ json file creator ################################
const fileCreator = (val, originalValue, type) => {
  fs.readFile(`./zjsonFiles/${type}/${val}.json`, (err, data) => {
    if (!data) {
      //#################### if file is not exist ###############################
      fs.writeFile(
        `./zjsonFiles/${type}/${val}.json`,
        JSON.stringify([originalValue]),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    //################################## if file is exist ########################
    if (data) {
      fs.writeFile(
        `./zjsonFiles/${type}/${val}.json`,
        JSON.stringify([...JSON.parse(data), originalValue]),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
};
//############################### MATERIAL UPLOAD ##################################
const materialUploadHandler = async (req, res) => {
  try {
    const val = {
      name: req.body.name,
      amount: req.body.amount,
      originalName: req.files.mat[0].originalname,
      currentName: req.files.mat[0].filename,
      path: pathHandler(req.files.mat[0].path),
      size: size(req.files.mat[0].size),
    };
    fileCreator(`${req.body.fileName}`, val, "materials");
    res.status(201).send("send");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//################################# TEAMS UPLOAD ###################################
const teamsUploadHandler = async (req, res) => {
  try {
    const val = {
      name: req.body.fullName,
      workStatus: req.body.workStatus,
      phone: req.body.phone,
      email: req.body.email,
      originalName: req.files.tms[0].originalname,
      currentName: req.files.tms[0].filename,
      path: pathHandler(req.files.tms[0].path),
      size: size(req.files.tms[0].size),
    };
    fileCreator(`${req.body.fileName}`, val, "teams");
    res.status(201).send(val);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//############################# feuture project upload ######################
const feuturesUploadHandler = async (req, res) => {
  try {
    const val = {
      title: req.body.title,
      description: req.body.description,
      originalName: req.files.feu[0].originalname,
      currentName: req.files.feu[0].filename,
      path: pathHandler(req.files.feu[0].path),
      size: size(req.files.feu[0].size),
    };
    fileCreator(`${req.body.fileName}`, val, "feutures");
    res.status(201).send("send");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//############################### previous data fetches ##########################
const fetches = (type, time) => {
  let arr = [];
  const data = fs.readFileSync(`./zjsonFiles/${type}/${time}${type}.json`);
  for (let i = 0; i < JSON.parse(data).length; i++) {
    arr.push(JSON.parse(data)[i]);
  }
  //arr.push(values);
  return arr;
};
//######################################## delete json files after upload #################
const deletes = (paths, time) => {
  paths.map((e) => {
    return fs.rm(`./zjsonFiles/${e}/${time}${e}.json`, (err, daa) => {
      if (err) {
        console.log(err);
      }
    });
  });
};
//################################ project post handler ##########################
const projectsUploadHandler = async (req, res) => {
  try {
    let val;
    if (req.body.flag === "true") {
      val = fetches("feutures", req.body.time);
    }
    if (req.body.flag === "false") {
      val = "there is no feuture project";
    }
    await projectsModel.create({
      title: req.body.proTitle,
      time: req.body.time,
      times: req.body.times,
      projects: {
        teamName: req.body.teamName,
        description: req.body.proDescription,
        video: {
          originalName: req.files.vid[0].originalname,
          currentName: req.files.vid[0].filename,
          path: pathHandler(req.files.vid[0].path),
          size: size(req.files.vid[0].size),
        },
      },
      materials: fetches("materials", req.body.time),
      teams: fetches("teams", req.body.time),
      feutureProjects: val,
      ack: req.body.ack,
      accept: false,
    });
    res.status(201).send("posted");
    //delete files
    if (req.body.flag === "true") {
      deletes(["feutures", "materials", "teams"], req.body.time);
    }
    if (req.body.flag === "false") {
      deletes(["materials", "teams"], req.body.time);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};
//get all projects
const getAllAcceptedProjectsHandler = async (req, res) => {
  try {
    const data = await projectsModel.find({ accept: true });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get new requested projects
const getAllNewRequestedProjectsHandler = async (req, res) => {
  try {
    const data = await projectsModel.find({ accept: false });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//accept new request handler
const acceptNewRequestedProjectsHandler = async (req, res) => {
  try {
    const data = await projectsModel.updateOne(
      { _id: req.query.ids },
      {
        $set: {
          accept: true,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//delete new request handler
const deleteNewRequestedProjectsHandler = async (req, res) => {
  try {
    const data = await projectsModel.deleteOne({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//################################# export functions ###################################
module.exports = {
  projectsUploadHandler,
  materialUploadHandler,
  teamsUploadHandler,
  feuturesUploadHandler,
  size,
  pathHandler,
  getAllAcceptedProjectsHandler,
  getAllNewRequestedProjectsHandler,
  acceptNewRequestedProjectsHandler,
  deleteNewRequestedProjectsHandler,
};
