const ResConstant = require('../tools/ResConstant');
const crypto = require('crypto');
const {
  User
} = require('../models/index');
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
    let user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error(ResConstant.EMAIL_USED.key);
    }
    let md5 = crypto.createHash('md5');
    user = await User.create({
      email: email,
      password: md5.update(password).digest('hex'),
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
    let md5 = crypto.createHash('md5');
    let user = await User.findOne({
      where: {
        email: email,
        password: md5.update(password).digest('hex'),
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
    ctx.returnValue(ResConstant.LOGIN_SUCCESS.key, {
      token: token
    })
  }

  async changePassword(ctx) {}

  async logout(ctx) {}

}

function checkEmail(email) {
  var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
  return reg.test(email);
}

module.exports = new UserController();