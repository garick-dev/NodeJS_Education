const express = require('express');
const multer = require("multer");

const upload = multer({});

const router = express.Router();

const saveUser  = require("../controllers/saveUser");
const findUser  = require("../controllers/findUser");

router.get('/', (req, res) =>  {

  res.render("index")
});

router.get('/message', async (req, res) =>  {

  const result = await findUser();
  for (let i = 0; i < result.length; i++) {
  if (req.session.id === result[i].sessionID) {
    res.send( { login: result[i].login, password: result[i].password } );
    return;
  }
  else {
    console.log("IDENTIFICATION NOT FOUND");
  }
}
});

router.post("/message", upload.none(), async (req, res) => {
 
  const result = await saveUser(req.body, req.session.id);
  res.json(result);
});

module.exports = router;
