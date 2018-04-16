function getStrDate(date) {
  const _date = date;
  const strDate = `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
  return strDate;
}

module.exports = getStrDate;
