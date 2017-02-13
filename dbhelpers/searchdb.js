const models = require('../db/models/index');
const moment = require('moment-timezone');

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

function getSearches(req, res, next) {
    models.sequelize.query('SELECT "Searches"."location", COUNT("Searches"."location") AS "timesSearched" FROM "Searches" JOIN "Users" ON "Users"."id" = "Searches"."belongsTo" WHERE "Users"."id" = :id GROUP BY "Searches"."location" ORDER BY "timesSearched" DESC', {
    replacements: { id: req.user.id }, 
    type: models.sequelize.QueryTypes.SELECT 
    }).then((searches) => {
        res.locals.searches = searches; 
        return next(); 
    });
}

function createTimeMachine(req, res, next) {
    console.log('creating');
    const timeMachineDate = moment(req.body.date);
    models.TimeMachine.create({
        location: req.body.address,
        belongsTo: req.user.id,
        dateSearched: timeMachineDate,
    }).then((timemachine) => {
        console.log(timemachine);
        req.session.currentTimeMachine = timemachine.dataValues;
        return next();
    }).catch((err) => {return next(err);});
}

function getDeLoreans(req, res, next) {
    models.sequelize.query('SELECT "TimeMachines".* FROM "TimeMachines" JOIN "Users" ON "Users"."id" = "TimeMachines"."belongsTo" WHERE "Users"."id" = :id ORDER BY "TimeMachines"."createdAt"', {
        replacements: { id: req.user.id }, 
        type: models.sequelize.QueryTypes.SELECT
    }).then((deloreans) => {
        res.locals.deloreans = deloreans;
        return next();
    });
}

module.exports = {
    createSearch,
    getSearches,
    createTimeMachine,
    getDeLoreans,
};
