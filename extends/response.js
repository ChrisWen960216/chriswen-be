/** Created By ChrisWen
 *  18/03/13
 *  Response Extend Class
 */

class ResponseExtends {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static createResMsg(code, msg) {
    return new ResponseExtends(code, msg, null);
  }

  static createResData(code, msg, data) {
    return new ResponseExtends(code, msg, data);
  }
}

module.exports = ResponseExtends;
