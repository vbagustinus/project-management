'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    deadline:DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Project.associate = model =>{
    // Project.hasMany(model.Project_Detail, {as: 'ProjectId'})
    Project.hasMany(model.Project_Detail)    
    Project.belongsToMany(model.Detail,
      {
        through: 'Project_Detail'
      })
  }
  return Project;
};