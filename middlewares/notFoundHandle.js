const ResponseExtend = require('../extends/response');
const status = require('../common/status');

const notFound = (request, response) =>
  Promise
    .resolve(ResponseExtend.createResMsg(status.NOT_FOUND, '该请求找不到对应的API'))
    .then(response.json);

module.exports = notFound;
