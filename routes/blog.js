const express = require('express');

const router = express.Router();
const { checkLogin } = require('../middlewares/authCheck');
const { $addBlog, $getBlogById } = require('../lib/index');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');

router.post('/', (request, response) => {
  const { blog } = request.body;
  let resData = {};
  return $addBlog(blog).then((data) => {
    const { title, _id } = data;
    const code = status.OPS_SUCCESS;
    const message = `标题为${title}的博客添加成功，后台ID是${_id}`;
    resData = ResponseExtend.createResData(code, message, _id);
    return response.json(resData);
  }).catch((error) => {
    resData = ResponseExtend.createResMsg(status.OPS_FAILURE, error);
    return response.json(resData);
  });
});

router.put('/:blogId', checkLogin, (request, response) => {
  const { blogId } = request.params;
  response.end('UPDATE_BLOG_BY_ID', blogId);
});

router.get('/:blogId', (request, response) => {
  const { blogId } = request.params;
  let resData = {};
  return $getBlogById(blogId).then((data) => {
    resData = ResponseExtend.createResData(status.OPS_SUCCESS, '获取博客详情成功!', data);
    return response.json(resData);
  }).catch((error) => {
    resData = ResponseExtend.createResMsg(status.OPS_FAILURE, error);
    return response.json(resData);
  });
});

// router.get('/:blogSpecies', (request, response) => {
//   const { blogSpecies } = request.param;
//   response.end('GET_BLOG_BY_SPECIES', blogSpecies);
// });

router.delete('/:blogId', (request, response) => {
  const { blogId } = request.params;
  response.end('DELETE_BLOG_BY_ID', blogId);
});

module.exports = router;
