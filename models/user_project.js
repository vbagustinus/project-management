'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Project = sequelize.define('User_Project', {
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User_Project.associate = model =>{
    User_Project.belongsTo(model.User);
    User_Project.belongsTo(model.Project);
  }
  return User_Project;
};