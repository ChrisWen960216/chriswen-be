const { Blog: BlogModel } = require('./model');
/**
 * title: String,
  species: String,
  imgSrc: String,
  introduce: String,
  auth: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
 */
class Blog {
  constructor(blog, condition) {
    this.blog = blog;
    this.condition = condition;
  }

  retrieveBlogsByCondition() {
    const { condition } = this;
    return new Promise((resolve, reject) => BlogModel.find(condition, (error, _blogs) => {
      if (error) { return reject(error); }
      return resolve(_blogs);
    }));
  }

  createBlog() {
    const { blog } = this;
    const _BlogModel = new BlogModel({ ...blog });
    return new Promise((resolve, reject) => _BlogModel.save((error, _blog) => {
      if (error) { return reject(error); }
      return resolve(_blog);
    }));
  }

  retrieveBlogById() {
    const { condition } = this;
    const { _id } = condition;
    return new Promise((resolve, reject) => BlogModel.findOne({ _id }, (error, _blog) => {
      if (error) { return reject(error); }
      return resolve(_blog);
    }));
  }

  updateBlogById() {
    const { condition, blog } = this;
    const { _id } = condition;
    return new Promise((resolve, reject) => BlogModel.findOneAndUpdate({ _id }, { ...blog }, { new: true }, (error, _blog) => {
      if (error) { return reject(error); }
      return resolve(_blog);
    }));
  }

  deleteBlogById() {
    const { condition } = this;
    const { _id } = condition;
    return new Promise((resolve, reject) => BlogModel.remove({ _id }, (error) => {
      if (error) { return reject(error); }
      return resolve(_id);
    }));
  }

  retrieveBlogListBySpecies() {
    const { species } = this.blog;
    return new Promise((resolve, reject) => {
      BlogModel.find({ species }, (error, blogs) => {
        if (error) {
          return reject(error);
        }
        return resolve(blogs);
      });
    });
  }
}

module.exports = Blog;
