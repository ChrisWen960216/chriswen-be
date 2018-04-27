/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
/* eslint-disable */
function errorHandle(error, request, response, next) {
  let resData = {};
  if(error.code && error.msg){
    resData = ResponseExtend.createResMsg(error.code,error.msg);
  } else {
    resData = ResponseExtend.createResData(status.OPS_FAILURE,'后台逻辑出错',{payload:error})
  }
  return response.json(resData);
}

module.exports = errorHandle;
