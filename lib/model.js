const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogDB = mongoose.createConnection('mongodb://localhost:27017/blogDB');

const userSchema = new Schema({
  name: String,
  password: String,
  authCode: Number,
});


mongoose.Promise = global.Promise;
const User = blogDB.model('user', userSchema);
module.exports = { User };
