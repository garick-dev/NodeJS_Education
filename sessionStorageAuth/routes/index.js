const express = require('express');
const multer = require("multer");


const upload = multer({});

const router = express.Router();

const  auth = require("../controllers/auth");

router.get('/', (req, res) =>  {
  res.render("index")
});

router.get('/auth', (req, res) =>  {
    if(req.session.uid) {
      res.send({status: "OK"});
    }
    else {
      res.send({status: "NOT FOUND"});
    }
});

router.post('/auth', upload.none(), async (req, res, next) =>  {

  const data = await auth.authUser(req.body.login, req.body.password);
  if (data.status === "OK") {
    req.session.uid = data.id;
     res.send( { status: "OK", id: req.session.uid});
     return;
  }
  else {
    res.send({status: "IDENTIFICATION NOT FOUND"});
    return;
  }
 
});

router.post("/reg", upload.none(), async (req, res) => {
   const result = await auth.createUser(req.body.name, req.body.login, req.body.password);
   console.log(result);
  if (result.status === "OK") {
    req.session.uid = result.id;
    res.send({status: "OK"});
  }
 else {
   res.send({ status: "Invalid data"});
 }  
});


router.get('/exit', (req, res) =>  {
    req.session.uid = null;
    res.send({status: "OK"});
});




module.exports = router;
