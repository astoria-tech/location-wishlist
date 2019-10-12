const suggestion = (sequelize, DataTypes) => {
    const Suggestion = sequelize.define('suggestion', {
      idea: {
        type: DataTypes.STRING,
        allowNull: false
      },
      votes: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
    });

    Suggestion.associate = models => {
        models.Suggestion.belongsTo(models.Location, { onDelete: 'CASCADE' });
      };
    return Suggestion;
  };

module.exports = suggestion;