const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const { match } = require("assert");

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

const httpServer = http.createServer((req, res) => {
  console.log(new Date() + " HTTP Connection");
  if (req.url === "/") {
    sendFile(res, "/public/index.html", "text/html");
    return;
  }
  if (req.url === "/js/main.js") {
    sendFile(res, "/public/js/main.js", "application/javascript");
    return;
  }
});

httpServer.listen(3000);

// WEBSocket SERVER

const wss = new WebSocket.Server({ server: httpServer });

wss.on("connection", (socket) => {
  console.log(new Date() + " New connection WS");
  let str = "";
  socket.on("message", (data) => {
    // str = String(data);
    console.log(String(data));
  });
});
