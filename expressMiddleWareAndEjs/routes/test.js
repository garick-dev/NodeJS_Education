const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello i'm test");
});

router.get("/video", (req, res) => {
  res.send("video");
});

module.exports = router;
