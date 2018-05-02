const ErrorExtend = require('../extends/error');
const status = require('../common/status');

class BlogController {
  constructor(request) {
    this.request = request;
  }

  retrieveBlogId() {
    const { blogId } = this.request.params;
    return new Promise((resolve, reject) => {
      if (blogId) {
        return resolve(blogId);
      }
      const error = new ErrorExtend(status.DATA_ILLEGAL, '找不到博客ID').createNewError();
      return reject(error);
    });
  }

  retrieveBlogInfo() {
    const { blog } = this.request.body;
    return new Promise((resolve, reject) => {
      if (blog) {
        return resolve(blog);
      }
      const error = new ErrorExtend(status.DATA_ILLEGAL, '找不到博客').createNewError();
      return reject(error);
    });
  }
}

module.exports = BlogController;
