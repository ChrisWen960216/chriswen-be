// error{type:specificErrorType,msg:Message}
const express = require('express');

const router = express.Router();

const {
  $getAllBlogs, $getBlogSpecies, $getBlogSequence, $updateBlogSequene, $retrieveBlogsBySequnce,
  // $createBlogSquence,
} = require('../lib/index');

const ErrorExtend = require('../extends/error');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const { getDataByFilter } = require('../common/filter');
const getStrDate = require('../common/date');

router.get('/', (request, response, next) => {
  const { filter } = request.query;
  let resData = {};
  let blogList = [];
  return $getAllBlogs(filter).then((blogs) => {
    // return new Promise(resolove,reject) => {}
    let _blogList = [];
    if (filter) {
      _blogList = filter ? getDataByFilter(filter, blogs) : blogs;
      blogList = _blogList;
    } else {
      blogList = blogs.length
        ? blogs.map((_blog) => {
          const dateStr = getStrDate(_blog.createTime);
          const {
            _id, title, species, content, introduce, auth,
          } = _blog;
          const $blog = {
            _id, title, species, content, introduce, auth, createTime: dateStr,
          };
          return $blog;
        }) : blogs;
    }
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, blogList);
    return response.json(resData);
  }).catch((error) => {
    next(error);
  });
});

// Get all blogs species *** Not available yet
router.get('/specieList', (request, response, next) => {
  let resData = {};
  return $getBlogSpecies().then((species) => {
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, species);
    return response.json(resData);
  }).catch((error) => {
    // const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    next(error);
  });
});

router.get('/sequence', (request, response, next) => {
  let resData = {};
  return $getBlogSequence()
    .then(sequene => $retrieveBlogsBySequnce(sequene)
      .then((_blogSequenceList) => {
        const code = status.OPS_SUCCESS;
        const message = '操作成功';
        const data = {
          sequene, _blogSequenceList,
        };
        resData = ResponseExtend.createResData(code, message, data);
        return response.json(resData);
      }))
    .catch((error) => {
      next(error);
    });
});

router.put('/sequene', (request, response, next) => {
  const { sequene, _id } = request.body;
  let resData = {};
  if (!sequene || !_id) {
    const error = new ErrorExtend(status.DATA_ILLEGAL, '数据非法').createNewError();
    throw error;
  }
  return $updateBlogSequene(_id, sequene).then(_sequene => $retrieveBlogsBySequnce(_sequene)
    .then((_blogSequenceList) => {
      const code = status.OPS_SUCCESS;
      const message = '操作成功';
      const data = {
        _sequene, _blogSequenceList,
      };
      resData = ResponseExtend.createResData(code, message, data);
      return response.json(resData);
    }))
    .catch((error) => {
      next(error);
    });
});

// router.post('/sequence', (request, response) => $createBlogSquence().then((_blogSequene) => {
//   response.json({ data: _blogSequene });
// }));


// router.get('/:blogSpecies', (request, response) => {
//   //
//   // let resData = {};
//   // const { blogSpecies } = request.params;
//   // return $getBlogBySpecies(blogSpecies).then((blogs) => {
//   //   const code = status.OPS_SUCCESS;
//   //   const message = '操作成功';
//   //   resData = ResponseExtend.createResData(code, message, blogs);
//   //   return response.json(resData);
//   // }).catch((error) => {
//   //   const code = status.OPS_FAILURE;
//   //   const message = error;
//   //   resData = ResponseExtend.createResMsg(code, message);
//   //   return response.json(resData);
//   // });
// });

module.exports = router;
