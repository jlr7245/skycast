const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

const forecastAXIOS = axios.create({
  baseURL: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}`,
});

function getForecast(req, res, next) {
  forecastAXIOS.get(`/${res.locals.lat},${res.locals.lng}`)
    .then((response) => {
      res.locals.forecastResponse = response.data;
      req.session.forecastResponse = response.data;
      return next();
    })
    .catch(err => console.log(err));
}

function getForecastManual(req, res, next) {
  forecastAXIOS.get(`/${req.user.baseLocation}`)
    .then((response) => {
      req.session.forecastResponse = response.data;
      return next();
    }).catch(err => console.log(err));
}

function getForecastSearch(req, res, next) {
  console.log(res.locals);
  forecastAXIOS.get(`/${res.locals.getLatLnResponse}`)
    .then((response) => {
      res.locals.searchResult = response.data;
      return next();
    })
    .catch((err) => {return next(err);});
}

function getForecastTimeMachine(req, res, next) {
  console.log(res.locals.tmLatLnResponse);
  console.log(req.session.currentTimeMachine.dateSearched);
  forecastAXIOS.get(`/${res.locals.tmLatLnResponse},${moment(req.session.currentTimeMachine.dateSearched).format('X')}`)
    .then((response) => {
      console.log(response.data);
      res.locals.timeMachineResult = response.data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      console.log('your error is in the forecast response');
      return next(err);
    });
}

module.exports = {
  getForecast,
  getForecastManual,
  getForecastSearch,
  getForecastTimeMachine,
};
