const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req,res,next) {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  
  return next();
}

function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  return models.User.create({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    baseLocation: req.body.baselocation,
    useTracking: true
  })
}

function loginRequired(req, res, next) {
  if (!req.user) {
    console.log('not logged in');
    return res.redirect('/auth/login');
  }
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}