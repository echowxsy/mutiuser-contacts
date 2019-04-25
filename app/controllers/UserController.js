const ResConstant = require('../tools/ResConstant');
const crypto = require('crypto');
const UserModel = require('../models/index').User;
const jwt = require('jsonwebtoken');
const config = require('../config/index');
let validator = require('validator');

class UserController {
  constructor() {}

  /**
   * @api {POST} /v1/regist 用户注册
   * @apiGroup User
   * @apiParam  {String} email 邮箱
   * @apiParam  {String} password 密码
   * @apiSuccessExample 200
   *     {
   *       "code": 0,
   *       "message": "注册成功",
   *       "data": {}
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 100,
   *       "message": "邮箱已经注册",
   *       "data": {},
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 1,
   *       "message": "错误的参数",
   *       "data": {},
   *     }
   */
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

  /**
   * @api {POST} /v1/login 用户登陆
   * @apiGroup User
   * @apiParam  {String} email 邮箱
   * @apiParam  {String} password 密码
   * @apiSuccessExample 200
   *     {
   *       "code": 0,
   *       "message": "登陆成功",
   *       "data": {
   *          "token": "eyJhbGci.asdaisdasdasd.dasdasdasdasdas",
   *          "refresh_token": "easdasd.sasdasdas.asdasdasda"
   *        }
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 102,
   *       "message": "密码错误",
   *       "data": {},
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 1,
   *       "message": "错误的参数",
   *       "data": {},
   *     }
   */
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

  /**
   * @api {PUT} /v1/user 用户修改密码
   * @apiGroup User
   * @apiHeader {String} Authorization token
   * @apiParam  {String} oldpasswd 旧密码
   * @apiParam  {String} password 密码
   * @apiSuccessExample 200
   *     {
   *       "code": 0,
   *       "message": "密码修改成功",
   *       "data": {}
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 102,
   *       "message": "密码错误",
   *       "data": {},
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 1,
   *       "message": "错误的参数",
   *       "data": {},
   *     }
   */
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

 /**
   * @api {PUT} /v1/oauth/refreshtoken 刷新token
   * @apiGroup User
   * @apiHeader {String} Authorization refresh_token
   * @apiParam  {String} oldpasswd 旧密码
   * @apiParam  {String} password 密码
   * @apiSuccessExample 200
   *     {
   *       "code": 0,
   *       "message": "Token刷新成功",
   *       "data": {token:'asdasdasd'}
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 105,
   *       "message": "refresh_token未到使用时间",
   *       "data": {},
   *     }
   * @apiErrorExample 200
   *     {
   *       "code": 1,
   *       "message": "错误的参数",
   *       "data": {},
   *     }
   */
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