const sio = require("socket.io");
const chatCtrl = require("../../../controllers/chat");


const run = (server) => {
const io = sio(server);

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("login", (data, cb) => {
    const { name } = data;
    const { login } = chatCtrl;
    const id = login(name, socket.id);
    cb(id);
  });

  socket.on("msg", (data) => {
    const { findUserSid } = chatCtrl;
    const currentUser = findUserSid(socket.id);
    io.emit("msgToFront", currentUser.id, currentUser.profile, data.text);
  });

  socket.on("userName", (userName) => {
    io.emit("typingName", userName);
  });

  socket.on("disconnect", () => {
    console.log("Disconect");
  });
});
}


module.exports = run; 