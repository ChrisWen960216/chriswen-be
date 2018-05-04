const { User: UserModel } = require('./model');

class User {
  constructor(user, condition) {
    this.user = user;
    this.condition = condition;
  }

  retrieveUserInfoByName() {
    const { name } = this.user;
    return new Promise((resolve, reject) => UserModel.findOne({ name }, (error, userInfo) => {
      if (error) { return reject(error); }
      return resolve(userInfo);
    }));
  }

  createUser() {
    const { user } = this;
    const _UserModel = new UserModel({ ...user });
    return new Promise((resolve, reject) => _UserModel.save((error, _user) => {
      if (error) { return reject(error); }
      return resolve(_user);
    }));
  }
}

module.exports = User;
