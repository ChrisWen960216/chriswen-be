const express = require('express');

const router = express.Router();
const multer = require('multer');
// const formiable = require('express-formidable');
const path = require('path');
const ResponseExtend = require('../extends/response');
const status = require('../common/status');
// const ErrorExtend = require('../extends/error');

const _path = path.join(__dirname, '../public/img/');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, _path);
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage }).single('carousel');

router.post('/', (request, response, next) => upload(request, response, (error) => {
  if (error) { return next(error); }
  return response.json(ResponseExtend.createResData(status.OPS_SUCCESS, '上传成功', request.file));
}));

module.exports = router;
