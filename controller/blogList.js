const status = require('../common/status');
const ErrorExtend = require('../extends/error');


class BlogList {
  constructor(request) {
    this.request = request;
  }

  getSpeciesId() {
    return Promise.resolve(this.request.params.speciesId);
  }
}

module.exports = BlogList;
