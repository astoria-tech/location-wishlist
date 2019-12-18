'use strict';

const uuid = require('uuid/v4'); // ES5

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Locations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};
