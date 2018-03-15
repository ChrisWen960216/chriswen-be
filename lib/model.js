const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogDB = mongoose.createConnection('mongodb://localhost:27017/blogDB');

const userSchema = new Schema({
  name: String,
  password: String,
  authCode: Number,
});

const blogSchema = new Schema({
  title: String,
  introduce: String,
  author: String,
  content: String,
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
const Blog = blogDB.model('blog', blogSchema);
module.exports = { User, Blog };
