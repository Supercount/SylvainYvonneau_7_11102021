'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define(
    'Post', {
      idUser: DataTypes.INTEGER,
      titre: DataTypes.STRING,
      contenu: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      date: DataTypes.DATE
    }, {
      classMethods: {
        associate: function(models) {
          models.Post.belongsTo(models.User,{
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    });
    return Post;
  };