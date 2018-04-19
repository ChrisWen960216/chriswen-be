// error{type:specificErrorType,msg:Message}
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const {
  $getAllBlogs, $getBlogById, $getBlogSequence, $updateBlogSequence, $getBlogBySpecies,
  // $createBlogSquence,
} = require('../lib/index');

const { ObjectId } = mongoose.Types;
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
// router.get('/specieList', (request, response, next) => {
//   let resData = {};
//   return $getBlogSpecies().then((species) => {
//     const code = status.OPS_SUCCESS;
//     const message = '操作成功';
//     resData = ResponseExtend.createResData(code, message, species);
//     return response.json(resData);
//   }).catch(error => next(error));
// });

router.get('/sequence', (request, response, next) =>
  $getBlogSequence()
    .then((blogSequence) => {
      const { _id, sequence } = blogSequence[0];
      const _blogSequence = sequence.map((id) => {
        if (ObjectId.isValid(id)) {
          return $getBlogById(id).then((blog) => {
            const { _id: $id, title, introduce } = blog;
            return { _id: $id, title, introduce };
          });
        }
        return { _id: '', title: '', introduce: '' };
      });
      return Promise.all([{ _id, sequence }, ..._blogSequence]);
    })
    .then((data) => {
      const blogSequence = [];
      for (let i = 1; i < data.length; i += 1) {
        blogSequence.push(data[i]);
      }
      const _data = { sequence: data[0], blogSequence };
      const resData = ResponseExtend.createResData(status.OPS_SUCCESS, '操作成功', _data);
      return response.json(resData);
    })
    .catch(error => next(error)));

router.put('/sequence', (request, response, next) => {
  const { _id, sequence } = request.body;
  return $updateBlogSequence(_id, sequence).then((_res) => {
    if (!_res) {
      const error = new ErrorExtend(status.DATA_ILLEGAL, '博客队列的ID不正确!').createNewError();
      throw error;
    }

    const _sequence = _res.sequence;
    const _blogSequence = _sequence.map((blogId) => {
      if (ObjectId.isValid(blogId)) {
        return $getBlogById(blogId).then((blog) => {
          const { _id: $id, title, introduce } = blog;
          return { _id: $id, title, introduce };
        });
      }
      return { _id: '', title: '', introduce: '' };
    });
    return Promise.all([{ _id, sequence: _sequence }, ..._blogSequence]);
  })
    .then((data) => {
      const blogSequence = [];
      for (let i = 1; i < data.length; i += 1) {
        blogSequence.push(data[i]);
      }
      const _data = { sequence: data[0], blogSequence };
      const resData = ResponseExtend.createResData(status.OPS_SUCCESS, '操作成功', _data);
      return response.json(resData);
    })
    .catch(error => next(error));
});


// router.post('/sequence', (request, response) => $createBlogSquence().then((_blogSequene) => {
//   response.json({ data: _blogSequene });
// }));


router.get('/:blogSpecies', (request, response) => {
  let resData = {};
  const { blogSpecies } = request.params;
  return $getBlogBySpecies(blogSpecies).then((blogs) => {
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, blogs);
    return response.json(resData);
  }).catch((error) => {
    const code = status.OPS_FAILURE;
    const message = error;
    resData = ResponseExtend.createResMsg(code, message);
    return response.json(resData);
  });
});

module.exports = router;
