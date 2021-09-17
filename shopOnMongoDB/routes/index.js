const express = require('express');

const router = express.Router();

const findBikeCtrl = require("../controllers/find/findBike");

router.get('/', (req, res) =>  {
  res.render("index")
});
router.get('/admin', (req, res) =>  {
  res.render("admin")
});

router.get('/bike', async (req, res) =>  {
  const result = await findBikeCtrl();
  console.log(result);
  res.send(result);
}); 

module.exports = router;
