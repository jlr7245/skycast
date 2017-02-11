const express = require('express');
const router = express.Router();

const google = require('../apihelpers/google-handlers');
const forecast = require('../apihelpers/forecast-handlers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', currentRoute: 'index' });
});

router.patch('/', google.getAddr, google.getTz, forecast.getForecast, (req,res) => {
  console.log("latitude: " + req.body.lat + " longitude: " + req.body.lng);
  res.status(200).send({
    latitude: req.body.lat,
    longitude: req.body.lng,
    geocodeResult: res.locals.geocodeResult,
    tzId: res.locals.tzId,
    tzName: res.locals.tzName,
    forecastResponse: res.locals.forecastResponse
  });
});

module.exports = router;
