const { ObjectId } = require('mongoose').Types;
const ErrorExtend = require('../extends/error');
const status = require('../common/status');

module.exports = {
  filterBlog(request, response, next) {
    const { blog } = request.body;
    const _blog = {
      title: blog.title,
      species: blog.species,
      auth: blog.auth,
      introduce: blog.introduce,
      content: blog.content,
    };
    request.body.blog = _blog;
    next();
  },
  filterId(request, response, next) {
    const { blogId } = request.params;
    if (!ObjectId.isValid(blogId)) {
      const error = new ErrorExtend(status.DATA_ILLEGAL, 'ID不正确').createNewError();
      return next(error);
    }
    return next();
  },
  filterCarousel(request, response, next) {
    const _sequence = request.body.sequence.map((carouselInfo) => {
      const { name = '', url = '', text = '' } = carouselInfo;
      return { name, url, text };
    });
    request.body.sequence = _sequence;
    return next();
  },
};

