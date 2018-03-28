const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getPwd, $registerUser } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

router.get('/', (request, response) => {
  response.end('Hello World');
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

  return $getPwd(name)
    .then(pwd => Bcrypt.confirmData(password, pwd))
    .then((result) => {
      if (result === true) {
        resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '登陆成功');
        request.session.user = 'ChrisWen';
      } else {
        resData = ResponseExtend.createResMsg(status.PWD_ILLEGAL, '用户名或者密码错误');
      }
      return response.json(resData);
    })
    .catch((error) => {
      throw new Error(error);
    });
});

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!');
  return response.json(resData);
});

module.exports = router;
