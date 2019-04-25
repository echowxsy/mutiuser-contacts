const config = require('../config/index');
let cache = require('memory-cache');

module.exports = async function (ctx, next) {
  let key = 'url:' + ctx.request.url;
  if (ctx.passport) {
    key = key + ':byuser:' + ctx.passport.userId;
  }
  if (ctx.request.method == 'GET') {
    if (cache.get(key)) {
      ctx.body = cache.get(key);
      return;
    } else {
      await next();
      cache.put(key, ctx.body, config.cache.expires);
      return
    }
  } else {
    cache.del(key)
    await next();
  }
}