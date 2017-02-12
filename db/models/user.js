'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(32),
      unique: true
    },
    password: DataTypes.TEXT,
    email: DataTypes.STRING(128),
    name: DataTypes.STRING(50),
    baseLocation: DataTypes.STRING,
    useTracking: DataTypes.BOOLEAN,
    timeZone: DataTypes.STRING(70),
    prettyLocation: DataTypes.STRING(255),
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};