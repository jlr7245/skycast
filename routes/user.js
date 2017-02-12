const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const forecast = require('../apihelpers/forecast-handlers');


/* GET dashbaord */
router.get('/', authHelpers.loginRequired, forecast.getForecastManual, (req, res, next) => {
  res.render('user/index', {
    user: req.user.dataValues,
    title: 'dashboard',
    currentRoute: 'dashboard',
    forecast: req.session.forecastResponse,
    prettyLocation: req.session.formattedAddress
  });
});

module.exports = router;
