'use strict';
module.exports = (sequelize, DataTypes) => {
  var Detail = sequelize.define('Detail', {
    task: DataTypes.STRING,
    status: DataTypes.STRING,
    User_ProjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Detail;
};