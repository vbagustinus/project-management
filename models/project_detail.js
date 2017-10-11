'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project_Detail = sequelize.define('Project_Detail', {
    DetailId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  });
  Project_Detail.associate = model =>{
    Project_Detail.belongsTo(model.Detail);
    Project_Detail.belongsTo(model.Project);
  }
  return Project_Detail;
};