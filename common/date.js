function getStrDate() {
  const date = new Date();
  const strDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log('strDate', strDate);
  return strDate;
}

module.exports = getStrDate;
