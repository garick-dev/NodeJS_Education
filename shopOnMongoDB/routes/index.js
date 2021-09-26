const express = require('express');

const router = express.Router();

const findBikeCtrl = require("../controllers/find/findBike");

router.get('/', (req, res) =>  {
  res.render("index")
});
router.get('/admin', (req, res) =>  {
  res.render("admin")
});

router.post('/filter-category', async (req, res) =>  {  
 const formDataKey = (Object.keys(req.body)).toString();
 const data = await findBikeCtrl();
 let name = "";
 let result = [];
 for (let item in data) { 

  for (let key in data[item].categories) {
      name = data[item].categories[key].name; 
      if ( name.includes(formDataKey)) {
        result.push(data[item]);
        break;
      }

    }     
}
    res.send(result);

});

router.get('/bike', async (req, res) =>  {
  const result = await findBikeCtrl();
  res.send(result);
}); 

module.exports = router;
