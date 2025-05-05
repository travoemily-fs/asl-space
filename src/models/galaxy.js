"use strict";

/* my notes
relationships to remember:
galaxy > HAS MANY > stars
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      // galaxy HAS MANY stars association
      Galaxy.hasMany(models.Star, {
        foreignKey: "GalaxyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // galaxy HAS MANY planets association
      Galaxy.hasMany(models.Planet, {
        foreignKey: "GalaxyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // image association
      Galaxy.hasMany(models.Image, {
        foreignKey: 'modelId',
        constraints: false,
        scope: {
          model: "Galaxy"
        }
      })
    }
  }
  Galaxy.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Galaxy",
    }
  );
  return Galaxy;
};
