const ResConstant = require('../tools/ResConstant');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

async function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.scret, (error, decoded) => {
      if (error) {
        if (error.name == 'TokenExpiredError') {
          throw new Error(ResConstant.TOKEN_EXPIRED.key);
        }
        if (error.name == 'JsonWebTokenError') {
          throw new Error(ResConstant.TOKEN_ERROR.key);
        }
        reject(error)
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = async function (ctx, next) {
  if (!ctx.header || !ctx.header.authorization) {
    throw new Error(ResConstant.USER_NEED_LOGIN.key);
  }
  const parts = ctx.header.authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    const schemeCheck = /^Bearer$/i.test(scheme);
    if (!schemeCheck) {
      throw new Error(ResConstant.USER_NEED_LOGIN.key);
    }
    let decodedToken = await verify(credentials);
    ctx.passport = decodedToken;
    await next();
  }
}