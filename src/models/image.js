"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // galaxy association
      Image.belongsTo(models.Galaxy, {
        foreignKey: "modelId",
        constraints: false,
      });
      // star association
      Image.belongsTo(models.Star, {
        foreignKey: "modelId",
        constraints: false,
      });
      // planet association
      Image.belongsTo(models.Planet, {
        foreignKey: "modelId",
        constraints: false,
      });
    }
  }

  Image.init(
    {
      model: DataTypes.STRING,
      modelId: DataTypes.INTEGER,
      extension: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );

  return Image;
};
