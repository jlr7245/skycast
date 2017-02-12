const express = require('express');
const router = express.Router();

const google = require('../apihelpers/google-handlers');
const forecast = require('../apihelpers/forecast-handlers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', currentRoute: 'index' });
});

router.patch('/', google.getAddr, forecast.getForecast, (req,res) => {
  console.log("latitude: " + req.body.lat + " longitude: " + req.body.lng);
  res.status(200).send({
    latitude: req.body.lat,
    longitude: req.body.lng,
    geocodeResult: res.locals.geocodeResult,
    forecastResponse: res.locals.forecastResponse
  });
});

/// think about adding tz back in here once the geocode & forecast are set up

module.exports = router;
