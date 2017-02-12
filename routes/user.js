const express = require('express');

const router = express.Router();
const authHelpers = require('../auth/auth-helpers');

const forecast = require('../apihelpers/forecast-handlers');


/* GET dashbaord */
router.get('/', authHelpers.loginRequired, forecast.getForecastManual, (req, res, next) => {
  console.log(req.session);
  res.render('user/index', {
    user: req.user.dataValues,
    title: 'dashboard',
    currentRoute: 'dashboard',
    forecast: req.session.forecastResponse,
    prettyLocation: req.session.formattedAddress,
  });
});

router.get('/search', authHelpers.loginRequired, (req, res, next) => {
  res.render('search/index', {
    user: req.user.dataValues,
    title: 'search',
    currentRoute: 'dashboard',
    prettyLocation: req.session.formattedAddress,
  })
})

module.exports = router;
