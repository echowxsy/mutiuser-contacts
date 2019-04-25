const supertest = require('supertest');
const should = require('should');
const app = require('../app');
const TestInit = require('./TestInit');

function request() {
  return supertest(app.listen())
}



describe('User test start ...', function () {
  before(async function () {
    await TestInit.initUser()
  });
  after(async function () {});

  describe('#1-0-0 创建用户', function () {
    let router = '/v1/regist';
    it('#1-0-1 Post /v1/regist', async function () {
      await new Promise((resolve, reject) => {
        let sendData = {
          email: "regist@test.com",
          password: "123456"
        }
        request().post(router)
          .send(sendData)
          .expect(200)
          .end(function (err, res) {
            res.body.code.should.be.eql(0);
            res.body.message.should.be.eql('注册成功');
            resolve()
          })
      })
    });
  })

  describe('#1-0-1 用户登陆', function () {
    let router = '/v1/login';
    it('#1-0-1 Post /v1/login', async function () {
      await new Promise((resolve, reject) => {
        let sendData = {
          email: "reg@test.com",
          password: "123456"
        }
        request().post(router)
          .send(sendData)
          .expect(200)
          .end(function (err, res) {
            res.body.code.should.be.eql(0);
            resolve()
          })
      })
    });
  })

  describe('#1-0-2 用户修改密码', function () {
    let router = '/v1/user';
    it('#0-0-1 Put /v1/user', async function () {
      let token = await TestInit.getToken();
      await new Promise((resolve, reject) => {
        let sendData = {
          oldpassword: "123456",
          password: "123456"
        }
        request().put(router)
          .set('Authorization', 'Bearer ' + token)
          .send(sendData)
          .expect(200)
          .end(function (err, res) {
            res.body.code.should.be.eql(0);
            resolve()
          })
      })
    });
  })

});
