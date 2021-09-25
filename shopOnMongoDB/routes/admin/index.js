const express = require('express');
const multer = require("multer");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const path = require("path");
const fs = require("fs");

const ajv = new Ajv();
addFormats(ajv);

// Controllers 

const saveCategoryCtrl = require("../../controllers/save/saveCategories");
const saveBrendCtrl = require("../../controllers/save/saveBrend");
const saveTypeCtrl = require("../../controllers/save/saveType");
const saveColorCtrl = require("../../controllers/save/saveColor");
const saveWheelCtrl = require("../../controllers/save/saveWheel");
const saveBikeCtrl = require("../../controllers/save/saveBike");

const findCategoryCtrl = require("../../controllers/find/findCategories");
const findBrendCtrl = require("../../controllers/find/findBrend");
const findTypeCtrl = require("../../controllers/find/findType");
const findColorCtrl = require("../../controllers/find/findColor");
const findWheelCtrl = require("../../controllers/find/findWheel");




const router = express.Router();

const upload = multer({ dest: path.join(__dirname, "../../public/upload") });


/* GET  DATA */
router.get('/category', async (req, res) =>  {
   const data = await findCategoryCtrl();
  res.send(data);
});
router.get('/brend', async (req, res) =>  {
   const data = await findBrendCtrl();
  res.send(data);
});
router.get('/type', async (req, res) =>  {
  const data = await findTypeCtrl();
   res.send(data);
});
router.get('/color', async (req, res) =>  {
  const data = await findColorCtrl();
   res.send(data);
});
router.get('/wheels', async (req, res) =>  {
  const data = await findWheelCtrl();
   res.send(data);
});

/*  / GET  */

/* POST  */

router.post('/category', upload.none(), async (req, res) =>  {
  console.log(req.body)
  const result = await saveCategoryCtrl(req.body.name)
  res.json({status: result.status});
});
router.post('/brend', upload.none(), async (req, res) =>  {
  console.log(req.body)
  const result = await saveBrendCtrl(req.body.name)
  res.json({status: result.status});
});
router.post('/type', upload.none(), async (req, res) =>  {
  const result = await saveTypeCtrl(req.body.name)
  res.json({status: result.status});
});
router.post('/color', upload.none(), async (req, res) =>  {
  console.log(req.body);
  const result = await saveColorCtrl(req.body.name)
  res.json({status: result.status});
});
router.post('/wheels', upload.none(), async (req, res) =>  {
  console.log(req.body);
  const result = await saveWheelCtrl(req.body.name)
  res.json({status: result.status});
});
router.post('/bike', upload.single("image"), async (req, res) =>  {
  const { filename } = req.file;
  const { originalname } = req.file;
  fs.rename(
    `./public/upload/${filename}`,
    `./public/upload/${originalname}`,
    function (err) {
      if (err) console.log("ERROR: " + err);
    }
  );
   const result = await saveBikeCtrl(req.body, originalname);
  res.json({status: result.status});
});
/* POST  */

module.exports = router;
