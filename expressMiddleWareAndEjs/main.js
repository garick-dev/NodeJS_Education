const express = require("express");
const path = require("path");
const root = require("./routes/root.js");
const test = require("./routes/test.js");
const blog = require("./routes/blog.js");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

//express middleware
server.use("/", root);
server.use("/test", test);
server.use("/blog", blog);

server.listen(3000);
