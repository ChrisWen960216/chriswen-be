const status = require('../common/status');
const ErrorExtend = require('../extends/error');

class UserService {
  constructor(user) {
    this.user = user;
  }

  infoValidate() {
    return new Promise((resolve, reject) => {
      if (this.user && this.user.authCode === 0) { return resolve(this.user); }
      const error = new ErrorExtend(status.PERMISSION_DENIED, '获取失败').createNewError();
      return reject(error);
    });
  }
}

module.exports = UserService;
