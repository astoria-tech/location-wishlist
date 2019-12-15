'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    address: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN,
  }, {});
  Location.associate = function(models) {
    models.Location.hasMany(models.Suggestion, { onDelete: "CASCADE" });
  };
  return Location;
};
