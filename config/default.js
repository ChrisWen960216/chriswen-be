/** Created By ChrisWen
 *  18/03/12
 *  Default config of app
 */

module.exports = {
  port: 7000,
  session: {
    secret: 'chriswenBlog',
    key: 'chriswenBlog',
    maxAge: 2592000000,
  },
  mongodb: 'mongodb://localhost:27017/blogDB',
};
