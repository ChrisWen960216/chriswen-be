/** Created By ChrisWen
 *  Response extend class
 */

class ResponseExtend {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static createResponse(code, message, data) {
    const resData = {};
    if (data) { resData.payload = data; }
    resData.code = code;
    resData.payload.message = message;
    return resData;
  }
}

module.exports = ResponseExtend;
