const DataBase = require('../app/tools/DataBase');
const jwt = require('jsonwebtoken');
const config = require('../app/config/index');

class TestInit {
  constructor() {}

  async initUser() {
    await DataBase.query('DELETE FROM `user`');
    await DataBase.query(`INSERT user (id,email,PASSWORD) VALUES (1,'reg@test.com','e10adc3949ba59abbe56e057f20f883e')`);
  }

  async getToken() {
    let token = jwt.sign({
      email: 'reg@test.com',
      userId: '1'
    }, config.jwt.scret, {
      expiresIn: config.jwt.expiresIn
    });
    return token
  }

}

module.exports = new TestInit();