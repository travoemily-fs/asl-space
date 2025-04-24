'use strict';

/* my notes
relationships to remember:
galaxy > HAS MANY > stars
*/

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      // stars HAS MANY association
    }
  }
  Galaxy.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Galaxy',
  });
  return Galaxy;
};