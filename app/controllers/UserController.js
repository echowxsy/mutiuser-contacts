const ResConstant = require('../tools/ResConstant');
const crypto = require('crypto');
const UserModel = require('../models/index').User;
const jwt = require('jsonwebtoken');
const config = require('../config/index');
let validator = require('validator');

class UserController {
  constructor() {}

  async regist(ctx) {
    const {
      email,
      password
    } = ctx.request.body;

    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
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
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
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
    if (validator.isEmpty(oldpassword) || validator.isEmpty(password)) {
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


module.exports = new UserController();