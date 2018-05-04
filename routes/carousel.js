const express = require('express');

const router = express.Router();
const { filterId, filterCarousel } = require('../middlewares/filter');

const ResponseExtends = require('../extends/response');
const ErrorExtend = require('../extends/error');
const status = require('../common/status');
const {
  $retrieveCarouselSequence,
  $updateCarouselSequenceById,
} = require('../lib/index');
const Carousel = require('../lib/carousel');

// router.post('/', (request, response, next) => $createCarouselSequence()
//   .then((_response) => {
//     const resData = ResponseExtends.createResData(status.OPS_SUCCESS, '添加成功', _response);
//     return resData;
//   })
//   .then(resData => response.json(resData))
//   .catch(error => next(error)));

router.get('/', (request, response, next) =>
  Carousel
    .retrieveCarouselSequence()
    .then(carousel => ResponseExtends.createResData(status.OPS_SUCCESS, '获取成功', ...carousel))
    .then(resData => response.json(resData))
    .catch(error => next(error)));

router.put('/:id', filterId, filterCarousel, (request, response, next) =>
  new Carousel(request.params.id, { sequence: request.body.sequence })
    .updateCarouselSequenceById()
    .then(_response => ResponseExtends.createResData(status.OPS_SUCCESS, '更新成功', _response))
    .then(resData => response.json(resData))
    .catch(error => next(error)));

module.exports = router;
