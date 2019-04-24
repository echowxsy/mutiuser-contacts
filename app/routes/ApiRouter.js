const Router = require('koa-router');

let api = Router({
  prefix: '/v1'
})

api.get('/', (ctx) => {
  ctx.body = 'Hello World';
});


module.exports = api;