require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise,
});

function getAddr(req, res, next) {
  const latLng = [req.body.lat, req.body.lng];
  googleMapsClient.reverseGeocode({
    latlng: latLng,
    result_type: 'neighborhood',
  }).asPromise()
    .then((response) => {
      res.locals.lat = req.body.lat;
      res.locals.lng = req.body.lng;
      res.locals.geocodeResult = response.json.results;
      req.session.geocodeResult = response.json.results;
      req.session.latLng = latLng;
      req.session.formattedAddress = response.json.results[0].formatted_address;
      return next();
    });
}

function getTz(req, res, next) {
  const latLng = [req.body.lat, req.body.lng];
  googleMapsClient.timezone({
    location: latLng,
  }).asPromise()
    .then((response) => {
      req.session.tzId = response.json.timeZoneId;
      req.session.tzName = response.json.timeZoneName;
      return next();
    });
}

function getLatLn(req, res, next) {
  if (req.body.baselocation !== req.session.formattedAddress) {
    googleMapsClient.geocode({
      address: req.body.baselocation,
    }).asPromise()
      .then((response) => {
        console.log(response.json.results);
        res.locals.getLatLnResponse = `${response.json.results[0].geometry.location.lat},${response.json.results[0].geometry.location.lng}`;
        req.session.formattedAddress = response.json.results[0].formatted_address;
        return next();
      }).catch((err) => console.log(err));
  } else {
    res.locals.getLatLnResponse = req.session.latLng.join();
    return next();
  }
}

function searchLatLn(req, res, next) {
  console.log(req.session.currentSearch);
 googleMapsClient.geocode({
    address: req.session.currentSearch.location,
  }).asPromise()
    .then((response) => {
      console.log(response.json.results);
      res.locals.getLatLnResponse = `${response.json.results[0].geometry.location.lat},${response.json.results[0].geometry.location.lng}`;
      res.locals.formattedAddress = response.json.results[0].formatted_address;
      return next();
    }).catch((err) => { return next(err); });
}



module.exports = {
  getAddr,
  getTz,
  getLatLn,
  searchLatLn,
};
