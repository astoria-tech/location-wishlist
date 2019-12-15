'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  );
  Location.associate = function(models) {
    models.Location.hasMany(models.Suggestion, { onDelete: "CASCADE" });
  };
  return Location;
};