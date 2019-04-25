const ResConstant = require('../tools/ResConstant');
const crypto = require('crypto');
const UserModel = require('../models/index').User;
const jwt = require('jsonwebtoken');
const config = require('../config/index');


class UserController {
  constructor() {}

  async regist(ctx) {
    const {
      email,
      password
    } = ctx.request.body;

    if (!email || !password) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    if (!checkEmail(email)) {
      throw new Error(ResConstant.EMAIL_ERROR.key);
    }
    let user = await UserModel.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error(ResConstant.EMAIL_USED.key);
    }
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
    user = await UserModel.create({
      email: email,
      password: passwordHash,
    })
    ctx.returnValue(ResConstant.REGIST_SUCCESS.key);
  }

  async login(ctx) {
    const {
      email,
      password
    } = ctx.request.body;

    if (!email || !password) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
    let user = await UserModel.findOne({
      where: {
        email: email,
        password: passwordHash,
      }
    })
    if (!user) {
      throw new Error(ResConstant.PASSWORD_ERROR.key);
    }
    const token = jwt.sign({
      email: user.email,
      userId: user.id
    }, config.jwt.scret, {
      expiresIn: config.jwt.expiresIn
    });
    const refreshToken = jwt.sign({
      email: user.email,
      userId: user.id
    }, config.jwt.scret, {
      expiresIn: config.jwt.expiresIn,
      notBefore: config.jwt.notBefore,
    });
    ctx.returnValue(ResConstant.LOGIN_SUCCESS.key, {
      token: token,
      refresh_token: refreshToken
    })
  }

  async changePassword(ctx) {
    const {
      oldpassword,
      password
    } = ctx.request.body;
    const userId = ctx.passport.userId;
    if (!oldpassword || !password) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    let user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    const oldpasswordHash = crypto.createHash('md5').update(oldpassword).digest('hex');
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
    if (user.password != oldpasswordHash) {
      throw new Error(ResConstant.PASSWORD_ERROR.key);
    }
    await user.update({
      password: passwordHash
    })
    ctx.returnValue(ResConstant.UPDATE_PASSWORD_SUCCESS.key)
  }

  async refreshToken(ctx) {
    const userId = ctx.passport.userId;
    const email = ctx.passport.email;
    const token = jwt.sign({
      email: email,
      userId: userId
    }, config.jwt.scret, {
      expiresIn: config.jwt.expiresIn
    });
    ctx.returnValue(ResConstant.TOKEN_REFRESH.key, {
      token: token
    })
  }

}

function checkEmail(email) {
  var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
  return reg.test(email);
}

module.exports = new UserController();