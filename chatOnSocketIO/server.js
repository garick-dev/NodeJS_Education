const express = require("express");
const fs = require("fs");
const server = require("http").createServer((req, res) => {
  // console.log(new Date() + " HTTP Connection");
  if (req.url === "/") {
    sendFile(res, "/views/index.html", "text/html");
    return;
  }
  if (req.url === "/js/main.js") {
    sendFile(res, "./public/js/main.js", "application/javascript");
    return;
  }
  if (req.url === "/css/style.css") {
    sendFile(res, "./public/css/style.css", "text/css");
    return;
  }
});
const io = require("socket.io")(server);

// HTTP SERVER
const sendFile = (res, filePath, contentType) => {
  const fullFilePath = `${__dirname}/${filePath}`;

  res.writeHead(200, {
    "Content-Type": contentType,
  });

  const readStream = fs.createReadStream(fullFilePath);
  readStream.pipe(res);
  return;
};

server.listen(3000);

// WEBSocket SERVER

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("msg", (data) => {
    io.emit("msgToFront", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconect");
  });
});
