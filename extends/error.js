class ErrorExtend {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }

  createNewError() {
    const _error = new Error();
    _error.code = this.code;
    _error.msg = this.msg;
    return _error;
  }
}

module.exports = ErrorExtend;
