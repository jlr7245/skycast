const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

//registration

router.get('/register', authHelpers.loginRedirect, (req,res) => {
  res.render('auth/register', {title: 'register', currentRoute: 'auth', location: req.app.locals.geocodeResult});
});

router.post('/register', (req, res, next) => {
  authHelpers.createUser(req, res)
    .then((user) => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/dashboard');
    });
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });

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