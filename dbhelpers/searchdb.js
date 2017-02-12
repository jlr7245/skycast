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

module.exports = {
    createSearch,
    createTimeMachine
};
