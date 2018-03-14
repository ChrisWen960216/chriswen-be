const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middlewares/authCheck');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');
// const Bcrypt = require('../common/bcrypt');

router.post('/login', checkLogin, (request, response) => {
  const { user } = request.session;
  const resData = ResponseExtend.createResMsg(status.OPS_SUCCESS, `Hello ${user}`);
  return response.send(resData);
  // const { user = '', password = '' } = request.body;
  // const mockData = 'ChrisWen';

  // if (user === '' || password === '') {
  //   const resData = ResponseExtend.createResMsg(status.DATA_ILLEGAL, '数据非法');
  //   return response.json(resData);
  // }

  // return Bcrypt.bcryptData(password)
  //   .then((hash) => {
  //     Bcrypt.confirmData(hash, mockData);
  //   })
  //   .then(/* DB OPS */)
  //   .catch((error) => {
  //     throw new Error(error);
  //   });
});

module.exports = router;
