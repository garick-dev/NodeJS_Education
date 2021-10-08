const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const saveUser = require("../controllers/saveUser");
const findUser = require("../controllers/findUser");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/login", async (req, res, next) => {
  const result = await findUser();
  for (let i = 0; i < result.length; i++) {
  if (req.session.id === result[i].sessionID) {
    res.send( { login: result[i].login } );
    return;
  }
  else {
    console.log("IDENTIFICATION NOT FOUND");
  }
}
});

router.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  const result = await saveUser(req.body, req.session.id);
  res.json(result);
});
module.exports = router;
