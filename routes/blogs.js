// error{type:specificErrorType,msg:Message}
const express = require('express');

const router = express.Router();

const { $getAllBlogs, $getBlogSpecies, $getBlogSequene } = require('../lib/index');

const ErrorExtend = require('../extends/error');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
const { getDataByFilter } = require('../common/filter');
const getStrDate = require('../common/date');

router.get('/', (request, response) => {
  const { filter } = request.query;
  let resData = {};
  let blogList = [];
  return $getAllBlogs(filter).then((blogs) => {
    if (filter) {
      blogList = getDataByFilter(filter, blogs);
    } else {
      blogList = blogs;
    }
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, blogList);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

// Get all blogs species *** Not available yet
router.get('/specieList', (request, response) => {
  let resData = {};
  return $getBlogSpecies().then((species) => {
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    resData = ResponseExtend.createResData(code, message, species);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});

router.get('/sequene', (request, response) => {
  let resData = {};
  return $getBlogSequene().then((squene) => {
    const code = status.OPS_SUCCESS;
    const message = '操作成功';
    const _squene = squene.split(',');
    resData = ResponseExtend.createResData(code, message, _squene);
    return response.json(resData);
  }).catch((error) => {
    const _error = new ErrorExtend(status.OPS_FAILURE, error).createNewError();
    throw _error;
  });
});


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
