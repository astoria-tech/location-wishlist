'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Suggestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idea: {
        type: Sequelize.STRING,
        allowNull: false
      },
      votes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      LocationId: {
        type: Sequelize.UUID,
        references: { model: 'Locations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Suggestions');
  }
};
