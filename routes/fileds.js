const express = require('express');
const path = require('path');

const router = express.Router();

const FileService = require('../service/file');

const { getDir, delFile } = FileService;
const ErrorExtend = require('../extends/error');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');


router.get('/imgs', (request, response, next) => {
  const dirPath = path.join(__dirname, '../public/img/');
  return getDir(dirPath)
    .then((fileNameList) => {
      const urlPrefix = 'http://localhost:7000/img';
      const carouselImgList = fileNameList.map((fileName) => {
        const _fileName = fileName;
        return { name: _fileName, url: `${urlPrefix}/${_fileName}` };
      });
      return carouselImgList;
    })
    .then((carouselImgList) => {
      const resData = ResponseExtend.createResData(status.OPS_SUCCESS, '操作成功', carouselImgList);
      return response.json(resData);
    })
    .catch(error => next(error));
});

router.delete('/imgs/:imgName', (request, response, next) => {
  const { imgName } = request.params;
  const imgPath = path.join(__dirname, `../public/img/${imgName}`);
  return delFile(imgPath).then((_response) => {
    if (_response === 1) {
      const resData = ResponseExtend.createResData(status.OPS_SUCCESS, '删除成功!', { name: imgName });
      return response.json(resData);
    }
    const _error = new ErrorExtend(status.OPS_FAILURE, '文件不存在').createNewError();
    throw _error;
  }).catch(error => next(error));
});

module.exports = router;
