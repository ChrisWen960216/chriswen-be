const express = require('express');

const router = express.Router();

const { $getAllBlog } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');

router.get('/', (request, response) => {
  let resData = {};
  return $getAllBlog().then((blogs) => {
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, blogs);
    return response.json(resData);
  }).catch((error) => {
    const code = status.OPS_FAILURE;
    const message = error;
    resData = ResponseExtend.createResMsg(code, message);
    return response.json(resData);
  });
});

module.exports = router;
