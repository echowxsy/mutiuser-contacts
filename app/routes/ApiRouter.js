const Router = require('koa-router');
const UserController = require('../controllers/UserController');

let api = Router({
  prefix: '/v1'
})

api.get('/', (ctx) => {
  ctx.body = 'Hello World';
});
api.post('/regist', UserController.regist);


module.exports = api;