const ResponseExtend = require('../extends/response');
const status = require('../common/status');

function notFound(request, response) {
  const resData = ResponseExtend.createResMsg(status.NOT_FOUND, '该请求找不到对应的API');
  return response.json(resData);
}

module.exports = notFound;
