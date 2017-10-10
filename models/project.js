'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Project.associate = model =>{
    Project.hasMany(model.User_Project ,{as: 'ProjectId'})
    Project.belongsToMany(model.User,
    {
      through: 'User_Projects',
      foreignKey: 'ProjectId'
    })
  }
  return Project;
};