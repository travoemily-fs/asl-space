"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create table
    await queryInterface.createTable("StarsPlanets", {
      // establish timestamp variables
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // establish primary key for stars
      StarId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          // referenced model
          model: "Stars",
          // identifier variable
          key: "id",
        },
        // join data together for a async bond
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      // establish primary key for planets
      PlanetId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          //referenced model
          model: "Planets",
          // identifier variable
          key: "id",
        },
        // join data together for a async bond
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // drop table
    await queryInterface.dropTable("StarsPlanets");
  },
};
