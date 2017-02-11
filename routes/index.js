var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', coordinates: null });
});

router.patch('/', (req,res) => {
  console.log("latitude: " + req.body.lat + " longitude: " + req.body.long);
  res.status(200).send({
    latitude: req.body.lat,
    longitude: req.body.long
  });
});

module.exports = router;
