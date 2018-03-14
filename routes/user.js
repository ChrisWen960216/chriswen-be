const express = require('express');

const router = express.Router();

const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const BcryptData = require('../common/bcrypt');

router.get('/login', (request, response) => {
  const { user = '', password = '' } = request.body;
  if (user === '' || password === '') {
    const resData = ResponseExtend.createResMsg(status.DATA_ILLEGAL, '数据非法');
    return response.json(resData);
  }
  const Bcrypt = new BcryptData(password);
  const mockData = 'ChrisWen';
  Bcrypt.bcryptData()
    .then((hash) => {
      new BcryptData(hash, mockData).confirmData()
        .then()
        .catch((error) => {
          throw new Error(error);
        });
    })
    .catch((error) => {
      throw new Error(error);
    });
});
