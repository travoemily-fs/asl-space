"use strict";

/* my notes
relationships to remember:
planets -> stars (BELONGS TO MANY)
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      // planets belong to MANY stars
      Planet.belongsToMany(models.Star, {
        through: "StarsPlanets",
        foreignKey: "PlanetId",
        otherKey: "StarId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // planets belong to ONE galaxy
      Planet.belongsTo(models.Galaxy, {
        foreignKey: "GalaxyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // image association
      Planet.hasMany(models.Image, {
        foreignKey: "modelId",
        constraints: false,
        scope: {
          model: "Planet",
        },
      });
    }
  }
  Planet.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      GalaxyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Planet",
    }
  );
  return Planet;
};
