const location = (sequelize, DataTypes) => {
    const Location = sequelize.define('location', {
      address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
    });
    return Location;
  };

module.exports = location;