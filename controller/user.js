const ErrorExtend = require('../extends/error');
const status = require('../common/status');

class UserController {
  constructor(request) {
    this.request = request;
  }

  retrieveUserInfo() {
    return new Promise((resolve, reject) => {
      const { name, password, authCode } = this.request.body;
      if (!name || !password) {
        const error = new ErrorExtend(status.DATA_ILLEGAL, '找不到用户名或者密码').createNewError();
        return reject(error);
      }
      return resolve({ name, password, authCode });
    }).catch((error) => { throw (error); });
  }

  retrieveUserName() {
    return new Promise((resolve, reject) => {
      const { user } = this.request.session;
      if (!user) {
        const error = new ErrorExtend(status.DATA_ILLEGAL, '获取不到用户信息').createNewError();
        return reject(error);
      }
      return resolve(user);
    }).catch((error) => { throw (error); });
  }
}

module.exports = UserController;
