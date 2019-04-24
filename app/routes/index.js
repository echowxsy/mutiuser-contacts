const api = require('./ApiRouter');

module.exports = function (router) {
  router.use('', api.routes(), api.allowedMethods());
}