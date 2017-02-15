const express = require('express');

const router = express.Router();
const authHelpers = require('../auth/auth-helpers');


const forecast = require('../apihelpers/forecast-handlers');
const google = require('../apihelpers/google-handlers');

const searchDB = require('../dbhelpers/searchdb');

const moment = require('moment');


/* GET dashbaord */
router.get('/', authHelpers.loginRequired, forecast.getForecastManual, (req, res, next) => {
  console.log(req.session);
  res.render('user/index', {
    user: req.user.dataValues,
    title: 'dashboard',
    currentRoute: 'dashboard',
    forecast: req.session.forecastResponse,
    prettyLocation: req.user.dataValues.prettyLocation,
    moment: moment,
  });
});

/* GET search */
router.get('/search', authHelpers.loginRequired, searchDB.getSearches, (req, res, next) => {
  res.render('search/index', {
    user: req.user.dataValues,
    title: 'search',
    currentRoute: 'dashboard',
    searches: res.locals.searches,
    prettyLocation: req.session.formattedAddress,
  });
});

/* post search */

router.post('/search', searchDB.createSearch, (req, res, next) => {
  res.redirect('/dashboard/search/result');
});

router.get('/search/result', authHelpers.loginRequired, google.searchLatLn, forecast.getForecastSearch, (req, res, next) => {
  console.log(res.locals);
  res.render('search/result', { 
    user: req.user.dataValues,
    prettyLocation: res.locals.formattedAddress, 
    forecast: res.locals.searchResult,
    title: `Weather for ${res.locals.formattedAddress}`,
    currentRoute: 'dashboard',
    moment: moment,
   });
});

/* time machine routes */

router.get('/timemachine', authHelpers.loginRequired, searchDB.getDeLoreans, (req, res, next) => {
  res.render('search/timemachine', {
    user: req.user.dataValues,
    title: 'time machine', 
    currentRoute: 'dashboard',
    deloreans: res.locals.deloreans,
    moment: moment,
  });
});

router.post('/timemachine', searchDB.createTimeMachine, (req, res, next) => {
  res.redirect('/dashboard/timemachine/result');
});

router.get('/timemachine/result', authHelpers.loginRequired, google.timeMachineLatLn, forecast.getForecastTimeMachine, (req, res, next) => {
  console.log(res.locals);
  res.render('search/timemachineresult', {
    user: req.user.dataValues,
    formattedAddress: res.locals.tmFormattedAddress,
    forecastResponse: res.locals.timeMachineResult,
    title: 'Delorean Hopping',
    currentRoute: 'dashboard',
    moment: moment,
  });
});

module.exports = router;
