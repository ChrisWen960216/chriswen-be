/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */

/* eslint-disable */
function errorHandle(error, request, response, next) {
  const { code = 500 } = error;
  return response.status(code).end('Service Unavilable');
}

module.exports = errorHandle;
