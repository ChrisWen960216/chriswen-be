const ErrorExtend = require('../extends/error');
const status = require('../common/status');

function getDataByFilter(filter, data) {
  if (!(filter instanceof Array || data instanceof Array)) {
    const error = new ErrorExtend(status.DATA_ILLEGAL, 'Filter or data\'s type is not Array').createNewError();
    return error;
  }
  const _resData = {};
  filter.forEach((_filter) => {
    _resData[_filter] = data[_filter];
  });
  return _resData;
}

exports.getDataByFilter = getDataByFilter;
