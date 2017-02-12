const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
  if (req.user) {
    return res.redirect('/dashboard');
  }

  return next();
}

function createUser(req, res, next) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  models.User.create({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    baseLocation: res.locals.getLatLnResponse,
    useTracking: req.body.tracking,
    prettyLocation: req.session.formattedAddress,
  }).then((user) => {
    req.login(user, (err) => {
      console.log(err);
      if (err) return next(err);
    });
    return next();
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
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
  createUser,
};
