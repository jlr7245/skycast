require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise
}); 

function getAddr(req, res, next) {
  console.log('getting address');
  let latLng = [req.body.lat, req.body.lng];
  console.log(latLng);
  googleMapsClient.reverseGeocode({
    latlng: latLng
  }).asPromise()
    .then((response) => {
      res.locals.geocodeResult = response.json.results;
      console.log(response.json.results);
      return next();
    });
  //return next();
}

module.exports = {
  getAddr
};