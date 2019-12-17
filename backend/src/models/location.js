'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Location.associate = function(models) {
    models.Location.hasMany(models.Suggestion, { onDelete: "CASCADE" });
  };
  return Location;
};
