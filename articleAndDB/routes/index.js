const express = require('express');
const multer = require("multer");
const saveArticleCtrl  = require("../controllers/saveArticleCtrl");
const findArticleCtrl = require("../controllers/findArticleCtrl");

const router = express.Router();

const upload = multer();

/* GET home page. */
router.get('/', async (req, res) =>  {
  
  res.render('index');
});
router.get('/article', async (req, res) =>  {
   const articleArray = await (findArticleCtrl());
  res.send(articleArray);
});

router.post("/", upload.none(), async (req,res) => {
  
    saveArticleCtrl(req.body.title, req.body.name, req.body.gender, req.body.birthday, req.body.text);
    const articleArray = await (findArticleCtrl());
   res.send(articleArray);
});

module.exports = router;
