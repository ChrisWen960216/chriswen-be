const { User, Blog } = require('./model');

// 查找对应用户的密码
function $getUserInfo(user) {
  return new Promise((resolve) => {
    User.findOne({ name: user }).then((_user) => {
      resolve(_user);
    });
  });
}

function $registerUser(userInfo) {
  const UserModel = new User({ ...userInfo });
  return new Promise((resolve, reject) => {
    UserModel.save((error, _user) => {
      if (error) {
        return reject(error);
      }
      return resolve(_user);
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
  return new Promise((resolve, reject) => {
    Blog.find({ species }, (error, blogs) => {
      if (error) {
        return reject(error);
      }
      return resolve(blogs);
    });
  });
}

function $getBlogById(blogId) {
  return new Promise((resolve, reject) => {
    Blog.findOne({ _id: blogId }, (error, blog) => {
      if (error) {
        return reject(error);
      }
      return resolve(blog);
    });
  });
}

module.exports = {
  $getUserInfo, $addBlog, $getAllBlog, $getBlogBySpecies, $getBlogById, $registerUser,
};
