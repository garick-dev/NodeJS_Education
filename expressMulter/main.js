const express = require("express");
const path = require("path");

const formRouter = require("./routes/form.js");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/form", formRouter);

server.listen(3000);
