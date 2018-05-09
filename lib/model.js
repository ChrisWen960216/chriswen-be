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
  versionKey: false,
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
  versionKey: false,
});

const blogSpeciesSchema = new Schema({
  code: String,
  species: String,
  versionKey: false,
});

const blogSequenceSchema = new Schema({
  sequence: [String],
  versionKey: false,
});

const carouselSchema = new Schema({
  sequence: [
    {
      _id: false,
      name: String,
      url: String,
      text: String,
      versionKey: false,
    }],
  versionKey: false,
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
const Blog = blogDB.model('blog', blogSchema);
const BlogSequence = blogDB.model('blogSequene', blogSequenceSchema);
const BlogSpecies = blogDB.model('blogSpecies', blogSpeciesSchema);
const Carousel = blogDB.model('Carousel', carouselSchema);
module.exports = {
  User, Blog, BlogSequence, BlogSpecies, Carousel,
};
