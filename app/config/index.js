const mysql = require('./Mysql');
const jwt = require('./JsonWebToken');

let config = {
  mysql: mysql,
  jwt: jwt
}

module.exports = config;