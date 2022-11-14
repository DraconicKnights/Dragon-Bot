const MySql = require('mysql');
require('dotenv/config');

module.exports = MySql.createConnection({
    host: 'localhost',
    dialect: 'mysql',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});