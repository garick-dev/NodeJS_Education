const express = require("express");
const path = require("path");
const main = require("./routes/main.js");
const blog = require("./routes/blog.js");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", main);
server.use("/blog", blog);

server.listen(3000);
