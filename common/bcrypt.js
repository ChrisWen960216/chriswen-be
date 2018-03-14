const bcrypt = require('bcryptjs');

class BcryptData {
  constructor(data, bcryptData) {
    this.data = data;
    this.bcryptData = bcryptData;
  }

  hashData() {
    return new Promise((resolve, reject) => {
      const { data } = this;
      bcrypt.genSalt(10, (error, salt) => {
        if (!error) {
          bcrypt.hash(data, salt, (_error, hash) => {
            if (!_error) {
              return resolve(hash);
            }
            return reject(_error);
          });
        }
        return reject(error);
      });
    });
  }

  confirmData() {
    return new Promise((resolve, reject) => {
      const { data, bcryptData } = this;
      return bcrypt.compare(data, bcryptData, (error, response) => {
        if (!error) {
          return resolve(response);
        }
        return reject(error);
      });
    });
  }
}

module.exports = BcryptData;

