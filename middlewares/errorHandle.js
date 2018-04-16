/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */
const ResponseExtend = require('../extends/response');

/* eslint-disable */
function errorHandle(error, request, response, next) {
  console.log('ERROR',error);
  let resData = {};
  if(error.code && error.msg){
    resData = ResponseExtend.createResMsg(error.code,error.msg);
  } else {
    resData = error;
  }
  return response.json(resData);
}

module.exports = errorHandle;
