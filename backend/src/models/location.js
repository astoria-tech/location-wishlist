'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
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
      },
      imageURL: {
        type: DataTypes.STRING,
      }
    },
    {}
  );
  Location.associate = function(models) {
    models.Location.hasMany(models.Suggestion, { onDelete: "CASCADE" });
  };
  return Location;
};
