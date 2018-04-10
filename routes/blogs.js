// error{type:specificErrorType,msg:Message}
const express = require('express');

const router = express.Router();

const { $getAllBlogs, $getBlogsByFilter } = require('../lib/index');

const ErrorExtend = require('../extends/error');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const { getDataByFilter } = require('../common/filter');

router.get('/', (request, response) => {
  const { filter } = request.query;
  const a = {};
  const test = { title: 'Hello', introduce: 'world', age: 22 };
  filter.forEach((_filter) => {
    a[_filter] = test[_filter];
  });
  console.log(a);
  // const resData = {};
  // const { filter } = request.query;
  // return $getAllBlogs(filter).then((blogs) => {
  //   if (filter) {
  //     const blog = { ...filter };
  //     console.log(blog);
  //     // filter.(_filter => {})
  //     console.log(...filter);
  //     return { ...filter };
  //   }
  // if(filter){
  //   blogs.map(blog => {
  //     const _blog =
  //   })
  // }
  // const code = status.OPS_SUCCESS;
  // const message = '操作成功';
  // resData = ResponseExtend.createResData(code, message, blogs);
  // return response.json(resData);
  // }).catch((error) => {
  //   const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
  //   throw _error;
  // });

  // {title,content,imgSrc,type,content}
});

// router.get('/:blogSpecies', (request, response) => {
//   let resData = {};
//   const { blogSpecies } = request.params;
//   return $getBlogBySpecies(blogSpecies).then((blogs) => {
//     const code = status.OPS_SUCCESS;
//     const message = '操作成功';
//     resData = ResponseExtend.createResData(code, message, blogs);
//     return response.json(resData);
//   }).catch((error) => {
//     const code = status.OPS_FAILURE;
//     const message = error;
//     resData = ResponseExtend.createResMsg(code, message);
//     return response.json(resData);
//   });
// });

module.exports = router;
