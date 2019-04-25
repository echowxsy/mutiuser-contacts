const Sequelize = require('sequelize');
const mysql = require('../config/index').mysql;
const Log = require('./Log');

let DataBase = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  logging: function (sql) {
    Log.info(sql);
  }
});
module.exports = DataBase;