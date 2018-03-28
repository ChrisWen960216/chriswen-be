const mongoose = require('mongoose');
const getStrDate = require('../common/date');

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
  species: Number,
  introduce: String,
  author: String,
  content: String,
  createTime: {
    type: String,
    default: getStrDate(),
  },
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
const Blog = blogDB.model('blog', blogSchema);
module.exports = { User, Blog };
