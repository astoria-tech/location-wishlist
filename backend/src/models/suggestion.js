'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define(
    "Suggestion",
    {
      idea: {
        type: DataTypes.STRING,
        allowNull: false
      },
      votes: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Suggestion.associate = function(models) {
    models.Suggestion.belongsTo(models.Location, { onDelete: "CASCADE" });
  };
  return Suggestion;
};
