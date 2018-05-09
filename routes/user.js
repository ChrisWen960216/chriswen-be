const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
// const { $registerUser } = require('../lib/index');
const User = require('../lib/user');

const ResponseExtend = require('../extends/response');
const ErrorExtend = require('../extends/error');

const UserService = require('../service/user');

const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

const UserController = require('../controller/user');

router.get('/info', (request, response, next) =>
  new UserController(request)
    // Retrieve UserName from session
    .retrieveUserName()
    // Search UserInfo from db by name
    .then(userName => new User({ name: userName }, null).retrieveUserInfoByName())
    // Validate access
    .then(userInfo => new UserService(userInfo).infoValidate())
    // Response data
    .then(result => ResponseExtend.createResData(status.OPS_SUCCESS, '权限验证成功', result))
    .then(resData => response.json(resData))
    .catch(next));

router.post('/register', (request, response, next) =>
  new UserController(request)
    // Retrieve userInfo from request body
    .retrieveUserInfo()
    // Bcrypt userInfo
    .then(userInfo => Promise.all([userInfo.name, Bcrypt.hashData(userInfo.password), userInfo.authCode]))
    // Save userInfo into DB
    .then(bcryptInfo => new User({ name: bcryptInfo[0], password: bcryptInfo[1], authCode: bcryptInfo[2] }).createUser())
    // // Response data
    .then(_res => ResponseExtend.createResData(status.OPS_SUCCESS, '注册成功', _res))
    .then(resData => response.json(resData))
    .catch(next));

router.post('/login', (request, response, next) =>
  // MiddleWares - Controller - Service - Extend - Error
  new UserController(request)
    // retrieveUserInfo from request body
    .retrieveUserInfo()
    // retrieveUserInfo from DB by userName
    .then(userInfo => Promise.all([new User(userInfo, null).retrieveUserInfoByName(), userInfo.password]))
    // checkout password
    .then(infoArray => Bcrypt.confirmData(infoArray[1], infoArray[0] ? infoArray[0].password : ''))
    // if password does not match, throw an error
    .then(result => (result || new ErrorExtend(status.DATA_ILLEGAL, '账号或者密码不对')))
    // response correct data
    .then((resData) => {
      request.session.user = 'ChrisWen';
      request.session.authCode = 0;
      return response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '登陆成功', resData));
    })
    .catch(next));

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  request.session.authCode = null;
  return response.json(ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!'));
});

module.exports = router;
