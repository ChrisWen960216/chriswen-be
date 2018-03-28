const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getUserInfo, $registerUser } = require('../lib/index');

const ResponseExtend = require('../extends/response');
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
  const { name, password, authCode } = request.body.user;
  let resData = {};
  Bcrypt.hashData(password).then((hash) => {
    const userInfo = { name, password: hash, authCode };
    return $registerUser(userInfo);
  }).then((_response) => {
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '注册成功', _response);
    return response.json(resData);
  }).catch((error) => {
    resData = ResponseExtend.createResMsg(status.OPS_FAILURE, error);
    return response.json(resData);
  });
});

router.post('/login', (request, response) => {
  const { name = '', password = '' } = request.body.user;
  let resData = {};
  if (name === '' || password === '') {
    resData = ResponseExtend.createResMsg(status.DATA_ILLEGAL, '数据非法');
    return response.json(resData);
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
      } else {
        resData = ResponseExtend.createResMsg(status.PWD_ILLEGAL, '数据非法');
      }
      return response.json(resData);
    })
    .catch((error) => {
      if (error) {
        resData = ResponseExtend.createResMsg(status.PWD_ILLEGAL, '数据非法');
      }
      return response.json(resData);
    });
});

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!');
  return response.json(resData);
});

module.exports = router;
