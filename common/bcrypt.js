const bcrypt = require('bcryptjs');

class Bcrypt {
  constructor(data, bcryptData) {
    this.data = data;
    this.bcryptData = bcryptData;
  }

  getData() {
    return this.data;
  }

  getDcryptData() {
    return this.bcryptData;
  }

  static hashData(data) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          return reject(error);
        }
        return bcrypt.hash(data, salt, (_error, hash) => {
          if (_error) {
            return reject(_error);
          }
          return resolve(hash);
        });
      });
    });
  }

  static confirmData(data, bcryptData) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data, bcryptData, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    });
  }
}

module.exports = Bcrypt;

