const axios = require('axios');
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
  forecastAXIOS.get(`/${res.locals.getLatLnResponse}`)
    .then((response) => {
      res.locals.searchResponse = response.data;
      return next();
    })
    .catch((err) => {return next(err);});
}

module.exports = {
  getForecast,
  getForecastManual,
};
