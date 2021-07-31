const express = require("express");
const multer = require("multer");
const Ajv = require("ajv");
const router = express.Router();

const ajv = new Ajv();
const upload = multer();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("payPage");
});
router.post("/storage", function (req, res, next) {
  const storageCart = req.body;
  console.log(storageCart);
});
router.post("/", upload.none(), (req, res) => {
  const schema = {
    type: "object",
    properties: {
      "first-name": { type: "string", minLength: 1, maxLength: 10 },
      "last-name": { type: "string" },
    },
    additionalProperties: false,
  };

  const validator = ajv.compile(schema);
  const valid = validator(req.body);
  console.log(req.body);

  if (!valid) {
    res.json({
      status: "invalid data",
      result: validator.errors,
    });
  } else {
    res.json({
      status: "OK",
      result: req.body,
    });
  }
});

module.exports = router;
