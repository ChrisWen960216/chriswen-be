const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getUserInfo, $registerUser } = require('../lib/index');
const User = require('../lib/user');

const ResponseExtend = require('../extends/response');
const ErrorExtend = require('../extends/error');

const UserService = require('../service/user');

const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

const UserController = require('../controller/user');

router.get('/info', (request, response, next) => {
  const { user } = request.session;
  let resData = {};
  return $getUserInfo(user).then((_user) => {
    if (!_user || _user.authCode !== 0) {
      resData = ResponseExtend.createResMsg(status.PERMISSION_DENIED, '权限验证失败');
    } else {
      resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '权限验证成功');
    }
    return response.json(resData);
  }).catch((error) => { next(error); });
});

router.post('/register', (request, response, next) =>
  new UserController(request)
    // Retrieve userInfo from request body
    .retrieveUserInfo()
    // Bcrypt userInfo
    .then(userInfo => Promise.all({ name: userInfo.name, password: Bcrypt.hashData(userInfo.password), authCode: userInfo.authCode }))
    // Save userInfo into DB
    .then(bcryptInfo => $registerUser(bcryptInfo[0]))
    // Response data
    .then(_res => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '注册成功', _res)))
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
