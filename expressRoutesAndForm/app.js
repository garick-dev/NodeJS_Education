const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const server = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.get("/img", (req, res) => {
  const filePath = path.join(__dirname, "picture.jpg");
  res.sendFile(filePath);
});

server.get("/blog/:id", (req, res) => {
  const id = Number(req.params.id);

  const article = [
    {
      id: 1,
      text: "article1",
    },
    {
      id: 2,
      text: "article2",
    },
    {
      id: 3,
      text: "article3",
    },
  ];

  const findArticle = article.find((val) => val.id === id);
  res.send(findArticle.text);
});

server.get("/register", urlencodedParser, (req, res) => {
  const joinFile = path.join(__dirname, "/register.html");
  res.sendFile(joinFile);
});

let userName = "",
  userAge = "";

server.post("/register", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  userName = req.body.userName;
  userAge = req.body.userAge;
  res.redirect("/newRoute");
});

server.get("/newRoute", urlencodedParser, (req, res) => {
  res.send(`${userName} - ${userAge}`);
});

server.listen(3000);
