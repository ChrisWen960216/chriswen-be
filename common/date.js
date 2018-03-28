function getStrDate() {
  const date = new Date();
  const strDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} 星期${date.getDay()}`;
  return strDate;
}

module.exports = getStrDate;
