//外部引用区域
const Koa = require('koa');
const Koa_router = require('koa-router')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const routerHandler = require('./app/routes/index');
const Log = require('./app/tools/Log');
const ErrorHandler = require('./app/tools/ErrorHandler');
const ResConstant = require('./app/tools/ResConstant');

//常量定义区
const DEFAULT_PORT = 3002;

let app = new Koa();
let router = Koa_router({});

//中间件:计算响应耗时
app.use(async (ctx, next) => {
  Log.info(`Precess ${ctx.request.method} ${ctx.request.url}...`);
  let
    start = Date.now(),
    ms;
  await next();
  ms = Date.now() - start;
  ctx.response.set('X-Response-Time', `${ms}ms`);
  Log.info(`Response Time: ${ms}ms`);
});

//中间件:错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    Log.error('Error: --->')
    Log.error(err)
    let handlerRs = ErrorHandler.handle(err.message);
    if (!handlerRs) {
      ctx.type = 'application/json';
      ctx.body = {
        code: -1,
        message: err.name,
        data: err.message
      }
      return;
    }
    ctx.type = 'application/json';
    ctx.body = {
      code: handlerRs.code,
      message: handlerRs.message,
    }
  }
});

//中间件:公用返回函数
app.use(async function (ctx, next) {
  ctx.returnValue = function (constantkey, data = {}) {
    if (!ResConstant[constantkey]) {
      throw new Error(ResConstant.SYSTEM_ERROR.key);
    }
    ctx.type = 'application/json';
    ctx.body = {
      code: ResConstant[constantkey].code,
      message: ResConstant[constantkey].message,
      data: data
    }
  }
  await next();
})

//中间件：解析原始 request 对象 body，绑定到 ctx.request.body
app.use(bodyParser());

//路由处理
routerHandler(router);
//跨域处理
app.use(cors());
app
  .use(router.routes())
  .use(router.allowedMethods());


if (module.parent) {
  module.exports = app;
} else {
  app.listen(DEFAULT_PORT, () => {
    Log.info('App start at: ' + DEFAULT_PORT);
  });
}