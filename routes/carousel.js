const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const ResponseExtends = require('../extends/response');
const ErrorExtend = require('../extends/error');
const status = require('../common/status');
const {
  // $createCarouselSequence,
  $retrieveCarouselSequence,
  $updateCarouselSequenceById,
} = require('../lib/index');

// router.post('/', (request, response, next) => $createCarouselSequence()
//   .then((_response) => {
//     const resData = ResponseExtends.createResData(status.OPS_SUCCESS, '添加成功', _response);
//     return resData;
//   })
//   .then(resData => response.json(resData))
//   .catch(error => next(error)));

router.get('/', (request, response, next) => $retrieveCarouselSequence()
  .then((carousel) => {
    const resData = ResponseExtends.createResData(status.OPS_SUCCESS, '获取成功', carousel);
    return resData;
  })
  .then(resData => response.json(resData))
  .catch(error => next(error)));

router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { sequence } = request.body;
  if (!ObjectId.isValid(id)) {
    const error = new ErrorExtend(status.DATA_ILLEGAL, 'ID不正确').createNewError();
    throw error;
  }
  const _sequence = sequence.map((carouselInfo) => {
    const { name = '', url = '', text = '' } = carouselInfo;
    return { name, url, text };
  });
  return $updateCarouselSequenceById(id, _sequence).then((_response) => {
    const resData = ResponseExtends.createResData(status.OPS_SUCCESS, '更新成功', _response);
    return resData;
  })
    .then(resData => response.json(resData))
    .catch(error => next(error));
});


module.exports = router;
