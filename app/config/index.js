const mysql = require('./Mysql');
const jwt = require('./JsonWebToken');
const cache = require('./MemoryCache');

let config = {
  mysql: mysql,
  jwt: jwt,
  cache: cache
}

module.exports = config;