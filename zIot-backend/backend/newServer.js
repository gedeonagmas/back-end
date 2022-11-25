const express = require("express");
const User = require("./models/userModel");
const { mesMod, Message } = require("./models/messageModel");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//end points
//create user
app.post("/signup", async (req, res) => {
  try {
    const data = await User.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      profilePic: {},
      status: req.body.status,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//single get
app.get("/login", async (req, res) => {
  try {
    const data = await User.find({ name: req.query.name });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//all get
app.get("/get/all/data", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//single chat getter
app.get("/get/single/chat", async (req, res) => {
  try {
    const data = await mesMod.find({
      chatId: req.query.ids,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//create chat
app.post("/create/specific/chat", async (req, res) => {
  try {
    const data = await mesMod.create({
      chatName: req.body.chatName,
      chatId: req.body.chatId,
      messages: req.body.messages,
      status: req.body.status,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//update messages
app.patch("/update/specific/chat", async (req, res) => {
  try {
    const data = await mesMod.findByIdAndUpdate(
      { _id: req.query.ids },
      {
        $set: {
          chatName: req.body.chatName,
          chatId: req.body.chatId,
          messages: req.body.messages,
          status: req.body.status,
        },
      }
    );
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//get data for status update
app.patch("/get/for/status", async (req, res) => {
  try {
    const data = await User.updateOne(
      { name: req.query.name },
      {
        $set: { status: req.query.status },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
//listener
const server = app.listen(7000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("### server connected successfully ###");
  }
});

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

  console.log(users, "addd");
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
  console.log(users, "filterdd");
  return users;
};

io.on("connection", (socket) => {
  socket.on("com", (user) => {
    if (user !== "") {
      addUser(user, socket.id);
      io.emit("aaa", users);
      console.log("###################################");
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("aaa", users);
    console.log("#######################################");
  });
  socket.on("rooms", (messages, rooms) => {
    socket.join(rooms);
    socket.to(rooms).emit("aa", messages);
  });
  socket.on("typing t", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing true", bool);
  });
  socket.on("typing f", (bool, room) => {
    socket.join(room);
    socket.broadcast.to(room).emit("typing false", bool);
  });
  socket.on("not", (val, room) => {
    socket.broadcast.to(room).emit("nots", "notification is comming");
  });
});
