const express = require('express');
const multer = require("multer");

// Controllers 

const saveGenreCtrl = require("../controllers/createGenre");
const saveAuthorCtrl = require("../controllers/createAuthor");
const saveBookCtrl = require("../controllers/createBook");

const findAuthorCtrl = require("../controllers/findAuthor");
const findGenreCtrl = require("../controllers/findGenre");

const router = express.Router();

const upload = multer();

/* GET home page. */
router.get('/', async (req, res) =>  {
  
  res.render('index');
});

router.get("/genre", upload.none(), async (req,res) => {
  const genre = await findGenreCtrl();
  console.log(genre);
   res.send(genre);
});
router.get("/author", upload.none(), async (req,res) => {
  const author = await findAuthorCtrl();
  console.log(author);
   res.send(author);
});



router.post("/genres", upload.none(), async (req,res) => {
  saveGenreCtrl(req.body.name);    
});


router.post("/authors", upload.none(), async (req,res) => {
  saveAuthorCtrl(req.body.name,req.body.short_name)  
});

router.post("/books", upload.none(), async (req,res) => {
  console.log(req.body);
  
   saveBookCtrl(req.body.name, req.body.year, req.body.location, req.body.publisher, req.body.author,req.body.genre)  
  });

module.exports = router;
