const Ajv = require("ajv");
const multer = require("multer");
const path = require("path");
const express = require("express");
const addFormats = require("ajv-formats");

const router = express.Router();

const ajv = new Ajv();
addFormats(ajv);

const upload = multer();
/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", upload.none(), function (req, res, next) {
  const schema = {
    type: "object",
    properties: {
      id: { type: "string", minLength: 1, maxLength: 120 },
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: {
        type: "string",
        format: "email",
      },
      gender: { enum: ["male", "famale", "alien"] },
      ip_address: {
        type: "string",
        format: "ipv4",
      },
      additionalProperties: false,
    },
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  console.log(req);
  const result = req.body;
  if (!valid) {
    res.json({
      status: "Invalid data",
      payload: {
        error: validate.errors,
      },
    });
  } else
    res.json({
      status: "ok",
      result: result,
    });
});

module.exports = router;
