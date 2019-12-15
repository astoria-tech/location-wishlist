'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define('Suggestion', {
    idea: DataTypes.STRING
  }, {});
  Suggestion.associate = function(models) {
    models.Suggestion.belongsTo(models.Location, { onDelete: "CASCADE" });
  };
  return Suggestion;
};