const Sequelize = require('sequelize');
const mysql = require('../config/index').mysql;

let DataBase = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});
module.exports = DataBase;