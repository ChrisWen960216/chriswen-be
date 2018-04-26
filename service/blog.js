const getStrDate = require('../common/date');

// const status = require('../common/status');
// const ResponseExtend = require('../extends/response');

class BlogService {
  constructor(blog) {
    this.blog = blog;
  }

  createResBlog() {
    const { blog } = this;
    return new Promise((resolve) => {
      const { _doc } = blog;
      const { __v, ...blogInfo } = _doc;
      const { createTime } = blogInfo;
      blogInfo.createTime = getStrDate(createTime);
      return resolve(blogInfo);
    });
  }
}

module.exports = BlogService;
