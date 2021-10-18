'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define(
    'Comment', {
      idUser: DataTypes.INTEGER,
      idPost: DataTypes.STRING,
      contenu: DataTypes.STRING,
      date: DataTypes.DATE
    }, {
      classMethods: {
        associate: function(models) {
          models.Comment.belongsTo(models.Post, {foreignKey:'idPost'});
          models.Comment.belongsTo(models.User, {foreignKey:'idUser'})
        }
      }
    });
  return Comment;
};