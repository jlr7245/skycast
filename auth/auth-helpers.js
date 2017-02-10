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
  
  return models.Users.create({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    baseLocation: req.body.baselocation,
    useTracking: true
  }).then(() => {
    res.redirect('/dashboard');
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.redirect('/');
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}