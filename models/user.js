'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: {
      type : DataTypes.STRING,
      isUnique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.associate = (model) =>{
    User.hasMany(model.Detail);
    User.hasMany(model.User_Project,{as: 'UserId'});
    User.belongsToMany(model.Project, 
      {
        through: 'User_Projects',
        foreignKey: 'UserId'
      });
  };
  return User;
};