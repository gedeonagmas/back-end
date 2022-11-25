const server = require("./../express");
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

const socketIo = io.on("connection", (socket) => {
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

module.exports = socketIo;
