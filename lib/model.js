const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogDB = mongoose.createConnection('mongodb://localhost:27017/ChrisWenBlogDB');

const userSchema = new Schema({
  name: String,
  password: String,
  authCode: {
    type: Number,
    default: 65535,
  },
});

const blogSchema = new Schema({
  title: String,
  type: String,
  imgSrc: String,
  introduce: String,
  author: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const blogsOrderSchema = new Schema({
  order: String,
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
const Blog = blogDB.model('blog', blogSchema);
const BlogsOrder = blogDB.model('blogsOrder', blogsOrderSchema);
module.exports = { User, Blog, BlogsOrder };
