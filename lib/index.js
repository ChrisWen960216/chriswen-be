const { User } = require('./model');

// 查找对应用户的密码
function $getPwd(user) {
  return new Promise((resolve) => {
    User.findOne({ name: user }).then((password) => {
      resolve(password);
    });
  });
}

module.exports = { $getPwd };
