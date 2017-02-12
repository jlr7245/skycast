const models = require('../db/models/index');

function createSearch(req, res, next) {
    models.Search.create({
        location: req.body.address,
        belongsTo: req.user.id,
        dateSearched: new Date(),
    }).then((search) => {
        console.log(search);
        req.session.currentSearch = search;
        return next();
    }).catch((err) => {return next(err);});
}

module.exports = {
    createSearch,
};
