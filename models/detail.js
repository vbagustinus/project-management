'use strict';
module.exports = (sequelize, DataTypes) => {
  var Detail = sequelize.define('Detail', {
    task: DataTypes.STRING,
    status: DataTypes.STRING,
    User_ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  });
  Detail.associate = model =>{
    Detail.belongsTo(model.User)
    Detail.hasMany(model.Project_Detail, {as: 'DetailId'})
    Detail.belongsToMany(model.Project,
      {
        through: 'Project_Details',
        foreignKey: 'DetailId'
      })
  }
  return Detail;
};