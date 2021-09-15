const express = require('express');
const multer = require("multer");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

// Controllers 

const saveBrendCtrl = require("../controllers/save/saveBrend");
const saveTypeCtrl = require("../controllers/save/saveType");
const saveColorCtrl = require("../controllers/save/saveColor");
const saveWheelCtrl = require("../controllers/save/saveWheel");
const saveBikeCtrl = require("../controllers/save/saveBike");

const findBrendCtrl = require("../controllers/find/findBrend");
const findTypeCtrl = require("../controllers/find/findType");
const findColorCtrl = require("../controllers/find/findColor");
const findWheelCtrl = require("../controllers/find/findWheel");




const router = express.Router();

const upload = multer();



router.get('/', async (req, res) =>  {
  res.render("index")
});
router.get('/admin', async (req, res) =>  {
  res.render("admin")
});

/* GET  DATA */
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
router.post('/bike', upload.none(), async (req, res) =>  {
  const result = await saveBikeCtrl(req.body.name, req.body.brend, req.body.model, req.body.wheels, req.body.year, req.body.color, req.body.type, req.body.brakes, req.body.price, req.body.about, req.body.img)
  res.json({status: result.status});
});
/* POST  */

module.exports = router;
