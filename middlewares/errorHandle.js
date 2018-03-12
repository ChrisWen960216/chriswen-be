/** Created By ChrisWen
  * ErrorHandle MiddleWare
  */

function errorHandle(error, request, response) {
  const { code = 500 } = error;
  return response.status(code).send('Service Unavilable');
}

module.exports = errorHandle;
