const express = require('express');

const router = express.Router();
const { checkLogin, checkAdmin } = require('../middlewares/authCheck');
const {
  $addBlog, $getBlogById, $updateBlogById, $removeBlogById,
} = require('../lib/index');

const ResponseExtend = require('../extends/response');
const ErrorExtend = require('../extends/error');
const status = require('../common/status');
const getStrDate = require('../common/date');


router.post('/', checkAdmin, (request, response) => {
  const { blog } = request.body;
  let resData = {};
  return $addBlog(blog).then((data) => {
    const { title, _id } = data;
    const code = status.OPS_SUCCESS;
    const message = `标题为${title}的博客添加成功，后台ID是${_id}`;
    resData = ResponseExtend.createResData(code, message, _id);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

router.put('/:blogId', checkLogin, (request, response) => {
  const { blogId } = request.params;
  const { blog } = request.body;
  let resData = {};
  return $updateBlogById(blogId, blog).then((data) => {
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '更新成功!', { id: data });
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

router.get('/:blogId', (request, response) => {
  const { blogId } = request.params;
  let resData = {};
  return $getBlogById(blogId).then((data) => {
    const { _doc } = data;
    const _data = { ..._doc, createTime: getStrDate(data.createTime) };
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '获取博客详情成功!', _data);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

// router.get('/:blogSpecies', (request, response) => {
//   const { blogSpecies } = request.param;
//   response.end('GET_BLOG_BY_SPECIES', blogSpecies);
// });

router.delete('/:blogId', (request, response) => {
  const { blogId } = request.params;
  let resData = {};
  return $removeBlogById(blogId).then((data) => {
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '删除博客成功', data);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

module.exports = router;
