'use strict';
module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define('Search', {
    location: DataTypes.STRING(255),
    belongsTo: DataTypes.BIGINT,
    dateSearched: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Search;
};