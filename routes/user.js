const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');
const { $getPwd } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const Bcrypt = require('../common/bcrypt');

router.post('/login', (request, response) => {
  const { user = '', password = '' } = request.body;
  let resData = {};
  // const mockData = 'ChrisWen';

  if (user === '' || password === '') {
    resData = ResponseExtend.createResMsg(status.DATA_ILLEGAL, '数据非法');
    return response.json(resData);
  }

  return $getPwd(user)
    .then(pwd => Bcrypt.confirmData(password, pwd))
    .then((result) => {
      if (result === true) {
        resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '登陆成功');
        request.session.user = 'ChrisWen';
      }
      resData = ResponseExtend.createResData(status.PWD_ILLEGA, '密码错误');
      return response.json(resData);
    });
});

router.delete('/logout', checkLogin, (request, response) => {
  request.session.user = null;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, '注销成功!');
  return response.json(resData);
});

module.exports = router;