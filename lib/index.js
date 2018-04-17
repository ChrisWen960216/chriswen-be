const {
  User, Blog, BlogSpecies, BlogSequence,
} = require('./model');

// const ObjectId = require('mongodb');

function $getUserInfo(name) {
  return new Promise((resolve) => {
    User.findOne({ name }).then((_user) => {
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

function $getAllBlogs() {
  return new Promise((resolve, reject) => {
    Blog.find((error, blogs) => {
      if (error) {
        return reject(error);
      }
      return resolve(blogs);
    });
  });
}

function $getBlogsByFilter(filter) {
  return new Promise((resolve, reject) => {
    Blog.find({ ...filter }, (error, blogs) => {
      if (error) {
        return reject(error);
      }
      return resolve(blogs);
    });
  });
}

// function $getBlogBySpecies(species) {
//   return new Promise((resolve, reject) => {
//     Blog.find({ species }, (error, blogs) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(blogs);
//     });
//   });
// }

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

function $updateBlogById(id, blog) {
  const {
    title, content, auth, introduce, species,
  } = blog;
  return new Promise((resolve, reject) => {
    Blog.findOneAndUpdate({ _id: id }, {
      title, content, auth, introduce, species,
    }, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(id);
    });
  });
}

function $removeBlogById(id) {
  return new Promise((resolve, reject) => {
    Blog.remove({ _id: id }, (error) => {
      if (error) { return reject(error); }
      return resolve(id);
    });
  });
}

function $getBlogSpecies() {
  return new Promise((resolve, reject) => {
    BlogSpecies.find((error, species) => {
      if (error) { return reject(error); }
      return resolve(species);
    });
  });
}

function $getBlogSequence() {
  return new Promise((resolve, reject) => {
    BlogSequence.find((error, sequene) => {
      if (error) { return reject(error); }
      return resolve(sequene);
    });
  });
}

function $createBlogSquence() {
  return new Promise((resolve, reject) => {
    const BlogSquenceModel = new BlogSequence({ sequence: ['', '', '', ''] });
    BlogSquenceModel.save((error, _blogSequene) => {
      if (error) {
        return reject(error);
      }
      return resolve(_blogSequene);
    });
  });
}

function $updateBlogSequence(id, sequence) {
  return new Promise((resolve, reject) => {
    BlogSequence.findOneAndUpdate({ _id: id }, { sequence }, (error, _sequence) => {
      if (error) { return reject(error); }
      return resolve(_sequence);
    });
  });
}

module.exports = {
  $addBlog,
  $updateBlogById,
  $removeBlogById,
  $getBlogsByFilter,
  $getAllBlogs,
  $getBlogById,
  $getUserInfo,
  $registerUser,
  $getBlogSpecies,
  $getBlogSequence,
  $createBlogSquence,
  $updateBlogSequence,
};
