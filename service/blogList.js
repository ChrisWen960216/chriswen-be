const getStrDate = require('../common/date');

let blogModel = {
  _id: '', title: '', auth: '', species: '', introduce: '', content: '', createTime: '',
};
class BlogListService {
  constructor(bloglist) {
    this.bloglist = bloglist;
  }

  modifyBlogListForDate() {
    return new Promise((resolve) => {
      let modifyList = [];
      modifyList = this.bloglist.map((blog) => {
        const { createTime } = blog;
        const strDate = getStrDate(createTime);
        ({ ...blogModel } = blog._doc);
        return { ...blogModel, createTime: strDate };
      });
      return resolve(modifyList);
    });
  }
}

module.exports = BlogListService;
