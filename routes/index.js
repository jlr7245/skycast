const express = require('express');
const router = express.Router();

const google = require('../apihelpers/google-handlers');
const forecast = require('../apihelpers/forecast-handlers');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home', currentRoute: 'index', user: req.user });
});

router.patch('/', google.getAddr, forecast.getForecast, (req, res) => {
  console.log("latitude: " + req.body.lat + " longitude: " + req.body.lng);
  res.render('partials/shortforecast', {
    latitude: req.body.lat,
    longitude: req.body.lng,
    geocodeResult: res.locals.geocodeResult,
    forecastResponse: res.locals.forecastResponse,
    formattedAddress: req.session.formattedAddress,
  });
});

module.exports = router;

