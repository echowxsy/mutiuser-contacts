const Router = require('koa-router');
const UserController = require('../controllers/UserController');

let api = Router({
  prefix: '/v1'
})

api.get('/', (ctx) => {
  ctx.body = 'Hello World';
});
api.post('/register', UserController.register);


module.exports = api;