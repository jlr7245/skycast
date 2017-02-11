require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise
}); 

function getAddr(req, res, next) {
  let latLng = [req.body.lat, req.body.lng];
  googleMapsClient.reverseGeocode({
    latlng: latLng,
    result_type: "neighborhood"
  }).asPromise()
    .then((response) => {
      res.locals.lat = req.body.lat;
      res.locals.lng = req.body.lng;
      res.locals.geocodeResult = response.json.results;
      return next();
    });
}

function getTz(req,res,next) {
    let latLng = [req.body.lat, req.body.lng];
    googleMapsClient.timezone({
      location: latLng
    }).asPromise()
      .then((response) => {
        res.locals.tzId = response.json.timeZoneId;
        res.locals.tzName = response.json.timeZoneName;
        return next();
      });
}

module.exports = {
  getAddr,
  getTz
};