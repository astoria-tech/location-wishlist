const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
  },
);

const models = {
  Location: sequelize.import('./location'),
};

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// exports.sequelize = sequelize;
// exports.models = models;
module.exports = {
    sequelize,
    models
}