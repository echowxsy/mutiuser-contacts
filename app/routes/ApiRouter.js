const Router = require('koa-router');
const UserController = require('../controllers/UserController');
const JsonWebTokenMiddleware = require('../middlewares/JsonWebTokenAuth');
const ContactController = require('../controllers/ContactController');
const GroupController = require('../controllers/GroupController');

let api = Router({
  prefix: '/v1'
})

api.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

api.post('/regist', UserController.regist);
api.post('/login', UserController.login);
api.put('/user', JsonWebTokenMiddleware, UserController.changePassword);
api.get('/oauth/refreshtoken', JsonWebTokenMiddleware, UserController.refreshToken);

api.post('/contact', JsonWebTokenMiddleware, ContactController.add);
api.get('/contact', JsonWebTokenMiddleware, ContactController.get);
api.put('/contact', JsonWebTokenMiddleware, ContactController.put);
api.delete('/contact', JsonWebTokenMiddleware, ContactController.del);

api.post('/group', JsonWebTokenMiddleware, GroupController.add);
api.get('/group', JsonWebTokenMiddleware, GroupController.get);
api.put('/group', JsonWebTokenMiddleware, GroupController.put);
api.delete('/group', JsonWebTokenMiddleware, GroupController.del);
api.get('/group/:groupId', JsonWebTokenMiddleware, GroupController.getContactList);
api.put('/group/:groupId', JsonWebTokenMiddleware, GroupController.addContact);
api.delete('/group/:groupId', JsonWebTokenMiddleware, GroupController.removeContact);

module.exports = api;