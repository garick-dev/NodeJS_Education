const express = require('express');
const multer = require("multer");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

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
    res.send(genre);
});
router.get("/author", upload.none(), async (req,res) => {
  const author = await findAuthorCtrl();
   res.send(author);
});



router.post("/genres", upload.none(), async (req,res) => {
  const schema = {
    type: "object",
    properties: {
      "name": { type: "string", minLength: 3, maxLength: 15 },
       },
    additionalProperties: false,
  };

  const validator = ajv.compile(schema);
  const valid = validator(req.body);
  
  if (!valid) {
    res.json({
      status: "Invalid data",
      result: validator.errors,
    });
  } else {   
    const result = await saveGenreCtrl(req.body.name);
      res.json({
      status: result.status,
      result: req.body,
    });
  }
   
});


router.post("/authors", upload.none(), async (req,res) => {
  const schema = {    
    type: "object",
    properties: {
      "name": { type: "string", minLength: 3, maxLength: 150 },
      "short_name": { type: "string", minLength: 3, maxLength: 25 },
      },
    additionalProperties: false,
  };

  const validator = ajv.compile(schema);
  const valid = validator(req.body);
 
  if (!valid) {
    res.json({
      status: "Invalid data",
      result: validator.errors,
    });
  } else {
    const result = await saveAuthorCtrl(req.body.name,req.body.short_name)  
    res.json({
      status: result.status,
      result: req.body,
    });
  }
});

router.post("/books", upload.none(), async (req,res) => {
  const schema = {    
    type: "object",
    properties: {
      "name": { type: "string", minLength: 5, maxLength: 150 },
      "year": { type: "string", format: "date"},
      "location": { type: "string", minLength: 5, maxLength: 125 },
      "publisher": { type: "string", minLength: 5, maxLength: 125 },
        },
    additionalProperties: true,
  };

  const validator = ajv.compile(schema);
  const valid = validator(req.body);

  if (!valid) {
    res.json({
      status: "Invalid data",
      result: validator.errors,
    });
  } else {
    const result = await 
    saveBookCtrl(req.body.name, req.body.year, req.body.location, req.body.publisher, req.body.author,req.body.genre)   
    res.json({
      status: result.status,
      result: req.body,
    });
  }


  });

module.exports = router;
