const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("./schema");
//##################################################
// const expressUpload = require("express-fileupload");
// app.use(expressUpload());
// // app.get("/ex", (req, res) => {
// //   res.sendFile(__dirname + "./src/iot-frontend/components/About.jsx");
// // });
const upload = require("../multer/upload");
const {feedbackPostHandler,feedbackGetHandler}=require('./../operations/feedback');
const {
  projectsUploadHandler,
  materialUploadHandler,
  teamsUploadHandler,
  feuturesUploadHandler,
  getAllAcceptedProjectsHandler,
  getAllNewRequestedProjectsHandler,
  acceptNewRequestedProjectsHandler,
  deleteNewRequestedProjectsHandler,
} = require("../operations/projects");

const { signupHandler, getSingleUser } = require("./../operations/signup");
const login = require("./../operations/login");
const {
  getAllUsers,
  deleteUsersHandler,
} = require("../operations/getAllUsers");
const {
  chatsHandler,
  getPrivateChatHandler,
  updatePrivateChatHandler,
} = require("../operations/chats");
const {
  filePostHandler,
  fileGetHandler,
  fileDeleteHandler,
} = require("./../operations/filePost");
const {
  groupCreateHandler,
  groupGetHandler,
  singleGroupGetHandler,
  getOwnGroupHandler,
  addGroupMemberHandler,
  joinRequestHandler,
  deleteGroupHandler,
} = require("../operations/groupCreate");
const {
  applyPostHandler,
  getApplyRequestHandler,
  getApplyAcceptedStudentsHandler,
  acceptApplyRequestHandler,
  deleteApplyUsersHandler,
} = require("../operations/applyPost");
const {
  blogsCreateHandler,
  getAllAcceptedBlogstHandler,
  getAllBlogsRequestHandler,
  deleteBlogsHandler,
  acceptNewBlogsHandler,
} = require("./../operations/blogs");
const {
  adminAuthCreateHandler,
  adminAuthUpdateHandler,
  adminAuthGetHandler,
} = require("../operations/adminAuth");
const port = 2200;

//middleware
app.use(express.json());
app.use(cors());
app.use("/iotUploads", express.static(path.join(__dirname, "iotUploads")));
//multer file fields
const multipleUpload = upload.fields([
  { name: "mat", maxCount: 1 },
  { name: "tms", maxCount: 1 },
  { name: "feu", maxCount: 1 },
  { name: "vid", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
  { name: "fileUpload", maxCount: 1 },
  { name: "groupPro", maxCount: 1 },
  { name: "apply", maxCount: 1 },
  { name: "blo", maxCount: 1 },
]);
//endpoints
app.post("/projects/post", multipleUpload, projectsUploadHandler);
app.post("/materials/post", multipleUpload, materialUploadHandler);
app.post("/teams/post", multipleUpload, teamsUploadHandler);
app.post("/feutures/post", multipleUpload, feuturesUploadHandler);
app.post("/signup", multipleUpload, signupHandler);
app.get("/login", login);
app.get("/get/all/users", getAllUsers);
app.post("/create/private/chat", chatsHandler);
app.get("/get/private/chat", getPrivateChatHandler);
app.patch("/update/private/chat", updatePrivateChatHandler);
app.post("/post/file", multipleUpload, filePostHandler);
app.get("/get/file", fileGetHandler);
app.delete("/delete/file", fileDeleteHandler);
app.post("/post/group", multipleUpload, groupCreateHandler);
app.get("/get/group/data", groupGetHandler);
app.get("/get/single/group", singleGroupGetHandler);
app.get("/get/own/group", getOwnGroupHandler);
app.get("/get/single/user", getSingleUser);
app.patch("/add/group/member", addGroupMemberHandler);
app.patch("/join/request", joinRequestHandler);
app.get("/get/all/accepted/projects", getAllAcceptedProjectsHandler);
app.get("/get/all/new/requested/projects", getAllNewRequestedProjectsHandler);
app.patch("/accept/new/project/request", acceptNewRequestedProjectsHandler);
app.delete("/delete/new/project/request", deleteNewRequestedProjectsHandler);
app.post("/apply/post", multipleUpload, applyPostHandler);
app.patch("/apply/accept/patch", acceptApplyRequestHandler);
app.get("/apply/accepted/get", getApplyAcceptedStudentsHandler);
app.get("/apply/request/get", getApplyRequestHandler);
app.delete("/apply/user/delete", deleteApplyUsersHandler);
app.delete("/delete/single/users", deleteUsersHandler);
app.delete("/delete/groups", deleteGroupHandler);
//for blogs
app.post("/post/blogs", multipleUpload, blogsCreateHandler);
app.get("/get/blogs/request", getAllBlogsRequestHandler);
app.get("/get/blogs/accepted", getAllAcceptedBlogstHandler);
app.patch("/accept/new/blogs", acceptNewBlogsHandler);
app.delete("/delete/blogs", deleteBlogsHandler);
//for admin auth
app.post("/admin/auth/create", adminAuthCreateHandler);
app.patch("/admin/auth/update", adminAuthUpdateHandler);
app.get("/admin/auth/get", adminAuthGetHandler);
//feedback end points
app.post('/feedback/post',feedbackPostHandler); 
app.get('/feedback/get',feedbackGetHandler)
//#################################################################################
//listeners
const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("### server connected successfully ###");
  }
});

//server.timeout = 600000;
//#################################################################################
//################################## SOCKET.IO ####################################
//#################################################################################
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (user, ids) => {
  if (users.length === 0) {
    users.push({ name: user, id: ids });
  } else {
    users.map((el) => {
      if (el.name === user) {
        el.id = ids;
      } else {
        users.push({ name: user, id: ids });
      }

      let duplicate = [];
      let isDuplicate = false;
      users = users.filter((el) => {
        isDuplicate = duplicate.includes(el.name);
        if (!isDuplicate) {
          duplicate.push(el.name);
          return true;
        } else {
          return false;
        }
      });
      return users;
    });
  }

  // console.log(users, "addd");
};

const removeUser = (ids) => {
  users = users.filter((el) => el.id !== ids);

  let duplicate = [];
  let isDuplicate = false;
  users = users.filter((el) => {
    isDuplicate = duplicate.includes(el.name);
    if (!isDuplicate) {
      duplicate.push(el.name);
      return true;
    } else {
      return false;
    }
  });
  // console.log(users, "filterdd");
  return users;
};

io.on("connection", (socket) => {
  socket.on("com", (user) => {
    if (user !== "") {
      addUser(user, socket.id);
      io.emit("aaa", users);
      // console.log("###################################");
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("aaa", users);
    // console.log("#######################################");
  });
  socket.on("typing t", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing true", bool);
  });
  socket.on("typing f", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing false", bool);
  });
  socket.on("aa", (messages, room) => {
    socket.join(room);
    socket.to(room).emit("bb", messages);
  });
  socket.on("sen aaaa", (val) => {
    io.emit("rec aaaa", val);
  });
  socket.on("sen bbbb", (val) => {
    io.emit("rec bbbb", val);
  });
  socket.on("sen dddd", (val) => {
    io.emit("rec dddd", val);
  });
  socket.on("a1", (val) => {
    io.emit("a2", val);
  });
  socket.on("bb1", (val) => {
    io.emit("bb2", val);
  });
  socket.on("cc1", (val) => {
    io.emit("cc2", val);
  });
  socket.on("ff1", (val) => {
    io.emit("ff2", val);
  });
  // socket.on("ss0", (name) => {
  //   //const id = allUsers.filter((el) => el.name === name);
  //   socket.join(name);
  //   socket.to(name).emit("ss1", "############################");
  //   console.log(name);
  // });
});
