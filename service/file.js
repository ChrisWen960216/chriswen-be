/** Created By ChrisWen
 *  FileSystem Service
 *  2018-04-19
 */

const fs = require('fs');

class FileService {
  constructor(path) {
    this.path = path;
  }

  static getFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (error, file) => {
        if (error) {
          return reject(error);
        }
        return resolve(file);
      });
    });
  }

  static getDir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, dirs) => {
        if (error) {
          return reject(error);
        }
        return resolve(dirs);
      });
    });
  }

  static delFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve(1);
      });
    });
  }
}

module.exports = FileService;
