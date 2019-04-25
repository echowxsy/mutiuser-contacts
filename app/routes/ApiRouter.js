const Router = require('koa-router');
const UserController = require('../controllers/UserController');
const JsonWebTokenMiddleware = require('../middlewares/JsonWebTokenAuth');

let api = Router({
  prefix: '/v1'
})

api.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

api.post('/regist', UserController.regist);
api.post('/login', UserController.login);
api.post('/user', JsonWebTokenMiddleware, UserController.changePassword);

module.exports = api;