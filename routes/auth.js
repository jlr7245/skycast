const express = require('express');
const router = express.Router();


const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');
const google = require('../apihelpers/google-handlers');


//registration

router.get('/register', authHelpers.loginRedirect, (req,res) => {
  //console.log(req.session);
  res.render('auth/register', {title: 'register', currentRoute: 'auth', location: req.session.geocodeResult, latLng: req.session.latLng});
});

/*router.post('/register', (req, res, next) => {
  authHelpers.createUser(req, res)
    .then((user) => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/dashboard');
    });
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });

});*/

router.post('/register', google.getLatLn, authHelpers.createUser, (req,res,next) => {
  res.redirect('/dashboard');
});

//login

router.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login', {title: 'login', currentRoute: 'auth'});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;