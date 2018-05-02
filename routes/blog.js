const express = require('express');

const router = express.Router();

const { checkAdmin } = require('../middlewares/authCheck');
const { filterBlog, filterId } = require('../middlewares/filter');

const Blog = require('../lib/blog');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const BlogService = require('../service/blog');

/**
 * router.post('/', checkAdmin, filterBlog, (request, response, next) => new Blog(request.body.blog, null)
  .createBlog()
  .then(_response => new BlogService(_response).createResBlog())
  .then(resBlog => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '创建成功!', { blog: resBlog })))
  .catch(error => next(error)));

router.put('/:blogId', checkLogin, filterBlog, (request, response, next) => new Blog(request.body.blog, { _id: request.params.blogId })
  .updateBlogById()
  .then(_response => new BlogService(_response).createResBlog())
  .then(resBlog => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '修改成功!', { blog: resBlog })))
  .catch(error => next(error)));
 */

router.post('/', checkAdmin, filterBlog, (request, response, next) =>
  new Blog(request.body.blog, null)
    .createBlog()
    .then(_response => new BlogService(_response).createResBlog())
    .then(resBlog => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '创建成功!', { blog: resBlog })))
    .catch(error => next(error)));

router.get('/:blogId', filterId, (request, response, next) =>
  new Blog(null, { _id: request.params.blogId })
    .retrieveBlogById()
    .then(_response => new BlogService(_response).createResBlog())
    .then(resBlog => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '查询成功!', { blog: resBlog })))
    .catch(error => next(error)));

router.put('/:blogId', filterId, filterBlog, (request, response, next) =>
  new Blog(request.body.blog, { _id: request.params.blogId })
    .updateBlogById()
    .then(_response => new BlogService(_response).createResBlog())
    .then(resBlog => response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '修改成功!', { blog: resBlog })))
    .catch(error => next(error)));

router.delete('/:blogId', filterId, (request, response, next) =>
  new Blog(null, { _id: request.params.blogId })
    .deleteBlogById()
    .then(blogId => response.json(ResponseExtend.createResMsg(status.OPS_SUCCESS, `ID:${blogId}的博客删除成功`)))
    .catch(error => next(error)));

module.exports = router;
