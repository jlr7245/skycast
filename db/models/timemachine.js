'use strict';
module.exports = function(sequelize, DataTypes) {
  var TimeMachine = sequelize.define('TimeMachine', {
    belongsTo: DataTypes.BIGINT,
    location: DataTypes.STRING(255),
    dateSearched: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TimeMachine;
};