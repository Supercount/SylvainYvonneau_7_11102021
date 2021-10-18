'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define(
    'Post', {
      titre: DataTypes.STRING,
      contenu: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      imageURL: DataTypes.STRING,
      date: DataTypes.DATE
    }, {
      classMethods: {
        associate: function(models) {
          models.Post.belongsTo(models.User,{
            foreignKey: {
              allowNull: false
            }
          });
          models.Post.hasMany(models.Comment);
        }
      }
    });
    return Post;
  };