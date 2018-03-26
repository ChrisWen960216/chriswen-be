const { User, Blog } = require('./model');

// 查找对应用户的密码
function $getPwd(user) {
  return new Promise((resolve) => {
    User.findOne({ name: user }).then((password) => {
      resolve(password);
    });
  });
}

function $addBlog(blog) {
  return new Promise((resolve, reject) => {
    const BlogModel = new Blog({ ...blog });
    BlogModel.save((error, _blog) => {
      if (error) {
        return reject(error);
      }
      return resolve(_blog);
    });
  });
}

function $getAllBlog() {
  return new Promise((resolve, reject) => {
    Blog.find((error, blogs) => {
      if (error) {
        return reject(error);
      }
      return resolve(blogs);
    });
  });
}

function $getBlogBySpecies(species) {
  console.log(species);
  return new Promise((resolve, reject) => {
    Blog.find({ species }, (error, blogs) => {
      if (error) {
        return reject(error);
      }
      return resolve(blogs);
    });
  });
}

module.exports = {
  $getPwd, $addBlog, $getAllBlog, $getBlogBySpecies,
};
