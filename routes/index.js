const express = require('express');
const router = express.Router();

const google = require('../apihelpers/google-handlers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', coordinates: null });
});

router.patch('/', google.getAddr, (req,res) => {
  console.log("latitude: " + req.body.lat + " longitude: " + req.body.lng);
  res.status(200).send({
    latitude: req.body.lat,
    longitude: req.body.lng
  });
});

module.exports = router;
