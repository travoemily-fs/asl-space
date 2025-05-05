"use strict";

/* my notes
relationships to remember:
stars -> belong to ONE galaxy
stars -> planets (have MANY)
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      // MANY stars BELONG TO one galaxy
      Star.belongsTo(models.Galaxy, {
        foreignKey: "GalaxyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // MANY stars belong to MANY planets
      Star.belongsToMany(models.Planet, {
        through: "StarsPlanets",
        foreignKey: "StarId",
        otherKey: "PlanetId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // image association
      Star.hasMany(models.Image, {
        foreignKey: "modelId",
        constraints: false,
        scope: {
          model: "Star",
        },
      });
    }
  }
  Star.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      GalaxyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Star",
    }
  );
  return Star;
};
