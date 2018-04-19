const express = require('express');
const path = require('path');

const router = express.Router();

const FileService = require('../service/file');

const { getDir } = FileService;
const ResponseExtend = require('../extends/response');
const status = require('../common/status');


router.get('/', (request, response, next) => {
  const dirPath = path.join(__dirname, '../public/img/');
  return getDir(dirPath)
    .then((fileNameList) => {
      const urlPrefix = 'localhots:7000/img';
      const carouselImgList = fileNameList.map((fileName) => {
        const _fileName = fileName;
        return `${urlPrefix}/${_fileName}`;
      });
      return carouselImgList;
    })
    .then((carouselImgList) => {
      const resData = ResponseExtend.createResData(status.OPS_SUCCESS, '操作成功', carouselImgList);
      return response.json(resData);
    })
    .catch(error => next(error));
});

// router.post('/', (request, response, next) => {

// });

module.exports = router;
