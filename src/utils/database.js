const { Sequelize } = require('sequelize');
require("dotenv").config();
const { Tedious } = require("sequelize");

const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    dialectModule: Tedious,
    logging: 0,
    timezone: "-04:00",
    useUTC: 0,
});

module.exports = db;
