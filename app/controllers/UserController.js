const ResConstant = require('../tools/ResConstant');
const crypto = require('crypto');
const {
  User
} = require('../models/index');



class UserController {
  constructor() {}
  
  async regist(ctx) {
    let {
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

  async login(ctx) {}

  async changePassword(ctx) {}

  async logout(ctx) {}

}

function checkEmail(email) {
  var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
  return reg.test(email);
}

module.exports = new UserController();