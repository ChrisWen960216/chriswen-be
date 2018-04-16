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
  species: String,
  imgSrc: String,
  introduce: String,
  auth: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const blogSpeciesSchema = new Schema({
  code: String,
  species: String,
});

const blogSequenceSchema = new Schema({
  sequence: [String],
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
const Blog = blogDB.model('blog', blogSchema);
const BlogSequence = blogDB.model('blogSequene', blogSequenceSchema);
const BlogSpecies = blogDB.model('blogSpecies', blogSpeciesSchema);
module.exports = {
  User, Blog, BlogSequence, BlogSpecies,
};
