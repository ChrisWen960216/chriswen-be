const { User } = require('../lib/mongo');

module.exports = {
  // 注册一个用户
  create: function create(user) {
    return User.create(user).exec();
  },
};

