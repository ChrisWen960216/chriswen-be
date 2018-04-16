const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getUserInfo, $registerUser } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const ErrorExtend = require('../extends/error');

const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

router.get('/info', (request, response) => {
  const { user } = request.session;
  let resData = {};
  return $getUserInfo(user).then((_user) => {
    if (!_user || _user.authCode !== 0) {
      resData = ResponseExtend.createResMsg(status.PERMISSION_DENIED, '权限验证失败');
    } else {
      resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '权限验证成功');
    }
    return response.json(resData);
  });
});

router.post('/register', (request, response) => {
  if (!request.body.user) {
    const _error = new ErrorExtend(status.OPS_FAILURE, '注册信息无法获取').createNewError();
    throw _error;
  }
  const { name, password, authCode } = request.body.user;
  let resData = {};
  Bcrypt.hashData(password).then((hash) => {
    const userInfo = { name, password: hash, authCode };
    return $registerUser(userInfo);
  }).then((_response) => {
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '注册成功', _response);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

router.post('/login', (request, response) => {
  if (!request.body.user) {
    const _error = new ErrorExtend(status.OPS_FAILURE, '登录信息无法获取').createNewError();
    throw _error;
  }
  const { name = '', password = '' } = request.body.user;
  let resData = {};
  if (name === '' || password === '') {
    const _error = new ErrorExtend(status.DATA_ILLEGAL, '数据非法').createNewError();
    throw _error;
  }

  return $getUserInfo(name)
    .then((_user) => {
      if (!_user) {
        const error = '数据非法';
        throw new Error(error);
      }
      return Bcrypt.confirmData(password, _user.password);
    })
    .then((result) => {
      if (result === true) {
        resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '登陆成功');
        request.session.user = 'ChrisWen';
        request.session.authCode = 0;
      } else {
        const _error = new ErrorExtend(status.DATA_ILLEGAL, '数据非法').createNewError();
        throw _error;
      }
      return response.json(resData);
    })
    .catch((error) => {
      throw error;
    });
});

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  request.session.authCode = null;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!');
  return response.json(resData);
});

module.exports = router;
