const express = require('express');

const router = express.Router();
const authHelpers = require('../auth/auth-helpers');


const forecast = require('../apihelpers/forecast-handlers');
const google = require('../apihelpers/google-handlers');


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

/* GET search */
router.get('/search', authHelpers.loginRequired, (req, res, next) => {
  res.render('search/index', {
    user: req.user.dataValues,
    title: 'search',
    currentRoute: 'dashboard',
    prettyLocation: req.session.formattedAddress,
  });
});

/* PATCH search */

router.patch('/search', google.searchLatLn, forecast.getForecastManual, (req, res, next) => {
  res.render('search/result', {
    location: res.locals.formattedAddress,
    result: res.locals.searchResult,
  }, (err, html) => res.send(html));
});

module.exports = router;
