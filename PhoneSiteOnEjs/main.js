const express = require("express");
const path = require("path");
const root = require("./routes/root.js");
const phoneList = require("./routes/phoneList.js");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", root);
server.use("/", phoneList);

server.listen(3000);
