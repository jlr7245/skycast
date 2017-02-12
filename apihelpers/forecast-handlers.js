const axios = require('axios');
require('dotenv').config();

const forecastAXIOS = axios.create({
  baseURL: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}`,
});

function getForecast(req,res,next) {
  forecastAXIOS.get(`/${res.locals.lat},${res.locals.lng}`)
    .then((response) => {
      res.locals.forecastResponse = response.data;
      req.session.forecastResponse = response.data;
      return next();
    })
    .catch((err) => console.log(err));
}

function getForecastManual(req,res,next) {
  forecastAXIOS.get(`/${req.user.baseLocation}`)
    .then((response) => {
      req.session.forecastResponse = response.data;
      return next();
    }).catch((err) => console.log(err));
}

module.exports = {
  getForecast,
  getForecastManual
};