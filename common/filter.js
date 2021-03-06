const ErrorExtend = require('../extends/error');
const status = require('../common/status');

function getDataByFilter(filter, data) {
  if (!filter) {
    return data;
  }
  if (!(data instanceof Array)) {
    const error = new ErrorExtend(status.DATA_ILLEGAL, 'Data\'s type is not Array').createNewError();
    return error;
  }
  let _resData = [];
  if (filter instanceof Array) {
    const finalDataArray = data.map((_data) => {
      const filterData = {};
      const $data = _data;
      filter.forEach((_filter) => {
        filterData[_filter] = $data[_filter];
      });
      return filterData;
    });
    _resData = finalDataArray;
  } else {
    _resData = data.map((_data) => {
      const $data = _data;
      return $data[filter];
    });
  }
  return _resData;
}

exports.getDataByFilter = getDataByFilter;
