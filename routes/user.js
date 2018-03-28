const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getUserInfo, $registerUser } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

// router.get('/info', (request, response) => {
//   const { user } = request.session;
//   const resData = {};
//   return $getUserInfo(user).then((_user) => {
//     if ((!_user) || (_user.authCode !== 0)) {
//       const error = { code: status.PERMISSION_DENIED, msg: '用户权限验证失败' };
//       throw new Error(error);
//     }
//   });
// });

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
    const _error = { type: 'OPS_FAILURE', msg: error };
    throw new Error(_error);
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
    .then(_user => Bcrypt.confirmData(password, _user.password))
    .then((result) => {
      if (result === true) {
        resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '登陆成功');
        request.session.user = 'ChrisWen';
      } else {
        const _error = { type: 'PWD_ILLEGAL', msg: '用户名或者密码错误' };
        throw new Error(_error);
      }
      return response.json(resData);
    })
    .catch((error) => {
      const _error = { type: 'OPS_FAILURE', msg: error };
      throw new Error(_error);
    });
});

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!');
  return response.json(resData);
});

module.exports = router;
