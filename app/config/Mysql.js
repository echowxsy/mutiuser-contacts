let process = require('process');

let mysqlDocker = {
  host: process.env.DB_HOST ? process.env.DB_HOST : '127.0.0.1',
  port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
  user: process.env.DB_USER ? process.env.DB_USER : 'root',
  password: process.env.DB_PASSWD ? process.env.DB_PASSWD : 'root',
  database: process.env.DB_NAME ? process.env.DB_NAME : 'mutiuser-contacts'
}

module.exports = mysqlDocker;