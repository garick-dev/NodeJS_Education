const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../public/upload") });

router.post("/", upload.single("newFile"), (req, res) => {
  let { textBox } = req.body;
  let { filename } = req.file;

  fs.rename(
    `./public/upload/${filename}`,
    `./public/upload/${textBox}.jpg`,
    function (err) {
      if (err) console.log("ERROR: " + err);
    }
  );
  res.json({
    status: "ok",
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
