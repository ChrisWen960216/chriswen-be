/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */

const status = require('../common/status');
const ResponseExtend = require('../extends/response');

/* eslint-disable */
function errorHandle(error, request, response, next) {
  const resData = ResponseExtend.createResMsg(status.OPS_FAILURE,error);
  return response.json(resData);
}

module.exports = errorHandle;
