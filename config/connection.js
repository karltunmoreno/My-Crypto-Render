const Sequelize = require('sequelize');
require('dotenv').config();

// Use environment variables or default values
const sequelize = new Sequelize(
  process.env.DB_NAME || 'my_crypto_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

module.exports = sequelize;
