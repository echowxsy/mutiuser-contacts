const supertest = require('supertest');
const should = require('should');
const app = require('../app');

function request() {
  return supertest(app.listen())
}

describe('App test start ...', function () {
  before(async function () {});
  after(async function () {});

  describe('#0-0-0 测试基础路由', function () {
    let router = '/v1/';
    it('#0-0-1 Get /v1/', async function () {
      await new Promise((resolve, reject) => {
        request().get(router)
          .expect(200)
          .end(function (err, res) {
            res.text.should.be.eql('mutiuser-contacts');
            resolve()
          })
      })
    });
  })

  describe('#0-1-0 测试缓存路由', function () {
    let router = '/v1/cachetest';
    it('#0-1-1 Get /v1/cachetest without cache', async function () {
      await new Promise((resolve, reject) => {
        request().get(router)
          .expect(200)
          .end(function (err, res) {
            res.text.should.be.eql('Hello world');
            resolve()
          })
      })
    });
    it('#0-1-2 Get /v1/cachetest with cache', async function () {
      await new Promise((resolve, reject) => {
        request().get(router)
          .expect(200)
          .end(function (err, res) {
            res.text.should.be.eql('Hello world');
            resolve()
          })
      })
    });
    it('#0-1-3 Post /v1/cachetest', async function () {
      await new Promise((resolve, reject) => {
        request().post(router)
          .send({})
          .expect(200)
          .end(function (err, res) {
            res.text.should.be.eql('clear cache');
            resolve()
          })
      })
    });
    it('#0-1-4 Get /v1/cachetest with clear cache', async function () {
      await new Promise((resolve, reject) => {
        request().get(router)
          .expect(200)
          .end(function (err, res) {
            res.text.should.be.eql('Hello world');
            resolve()
          })
      })
    });
  })

});

//   describe('#0-1-0 POST /api/v1/admin/acttime', function () {
//     let router = '/api/v1/admin/acttime';
//     it('#0-1-1 管理员设置活动时间参数不正确', async function () {
//       let utoken = await DataInit.loginWithAdmin();
//       let sentData = {
//         startTime: 1553683561994
//       }
//       await new Promise((resolve, reject) => {
//         request().post(router)
//           .set('utoken', utoken)
//           .send(sentData)
//           .end(function (err, res) {
//             res.body.code.should.be.eql(400);
//             resolve()
//           })
//       })
//     });
//     it('#0-1-2 管理员正确设置活动时间', async function () {
//       let utoken = await DataInit.loginWithAdmin();
//       await DataInit.setActUnStart();
//       let sentData = {
//         startTime: 1553683561994,
//         endTime: 1558693561995
//       }
//       await new Promise((resolve, reject) => {
//         request().post(router)
//           .set('utoken', utoken)
//           .send(sentData)
//           .end(function (err, res) {
//             res.body.code.should.be.eql(201);
//             resolve()
//           })
//       })
//     });
//     it('#0-1-2 活动已经开始进行，禁止进行修改', async function () {
//       let utoken = await DataInit.loginWithAdmin();
//       await DataInit.setActStart();
//       let sentData = {
//         startTime: 1553683561994,
//         endTime: 1558693561995
//       }
//       await new Promise((resolve, reject) => {
//         request().post(router)
//           .set('utoken', utoken)
//           .send(sentData)
//           .end(function (err, res) {
//             res.body.code.should.be.eql(403);
//             resolve()
//           })
//       })
//     });
//   })

//   describe('#0-2-0 GET /api/v1/admin/acttime', function () {
//     let router = '/api/v1/admin/acttime';
//     it('#0-2-1 管理员没有操作权限', async function () {
//       let utoken = await DataInit.loginWithUser();
//       await new Promise((resolve, reject) => {
//         request().get(router)
//           .set('utoken', utoken)
//           .expect(200)
//           .end(function (err, res) {
//             res.body.code.should.be.eql(403);
//             resolve()
//           })
//       })
//     });
//   })
// })