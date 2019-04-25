const Router = require('koa-router');
const UserController = require('../controllers/UserController');
const JsonWebTokenMiddleware = require('../middlewares/JsonWebTokenAuth');
const ContactController = require('../controllers/ContactController');
const GroupController = require('../controllers/GroupController');
const MemoryCacheMiddleware = require('../middlewares/MemoryCache');

let api = Router({
  prefix: '/v1'
})

api.get('/cachetest', MemoryCacheMiddleware, async (ctx) => {
  async function delay(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  };
  await delay(3000);
  ctx.body = 'Hello world'
});
api.post('/cachetest', MemoryCacheMiddleware, (ctx) => {
  ctx.body = '缓存将被清空'
});

api.post('/regist', UserController.regist);
api.post('/login', UserController.login);
api.put('/user', JsonWebTokenMiddleware, UserController.changePassword);
api.get('/oauth/refreshtoken', JsonWebTokenMiddleware, UserController.refreshToken);

api.post('/contact', JsonWebTokenMiddleware, MemoryCacheMiddleware, ContactController.add);
api.get('/contact', JsonWebTokenMiddleware, MemoryCacheMiddleware, ContactController.get);
api.put('/contact', JsonWebTokenMiddleware, MemoryCacheMiddleware, ContactController.put);
api.delete('/contact', JsonWebTokenMiddleware, MemoryCacheMiddleware, ContactController.del);

api.post('/group', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.add);
api.get('/group', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.get);
api.put('/group', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.put);
api.delete('/group', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.del);
api.get('/group/:groupId', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.getContactList);
api.put('/group/:groupId', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.addContact);
api.delete('/group/:groupId', JsonWebTokenMiddleware, MemoryCacheMiddleware, GroupController.removeContact);

module.exports = api;