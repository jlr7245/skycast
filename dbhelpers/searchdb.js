const models = require('../db/models/index');

function createSearch(req, res, next) {
    models.Search.create({
        location: res.locals.getLatLnResponse,
        belongsTo: req.user.id
    });
}

module.exports = {
    createSearch,
};
