const axios = require('axios');
require('dotenv').config();

const forecastAXIOS = axios.create({
  baseURL: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}`,
});

module.exports = {
  forecastAXIOS
};