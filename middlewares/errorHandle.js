/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */
const ResponseExtend = require('../extends/response');

/* eslint-disable */
function errorHandle(error, request, response, next) {
  const resData = ResponseExtend.createResMsg(error.code,error.msg);
  return response.json(resData);
}

module.exports = errorHandle;
