const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

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

wss.on("connection", (ws) => {
  console.log(new Date() + " new connection WS");
});
