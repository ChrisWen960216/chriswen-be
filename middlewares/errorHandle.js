/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */

const status = require('../common/status');
const ResponseExtend = require('../extends/response');

/* eslint-disable */
function errorHandle(error, request, response, next) {
  const {type='OPS_FAILURE',msg = '后台服务错误'} = error;
  const resData = ResponseExtend.createResMsg(status[type],msg);
  return response.json(resData);
}

module.exports = errorHandle;
