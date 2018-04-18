const express = require('express');

const router = express.Router();
const multer = require('multer');
// const formiable = require('express-formidable');
const path = require('path');

const _path = path.join(__dirname, '../public/img/');

const upload = multer({ dest: _path }).single('carousel');

const ResponseExtend = require('../extends/response');
const status = require('../common/status');

// router.use();

/**
 *  formiable({
  uploadDir: path.join(__dirname, '../public/img'),
  keepExtensions: true,
})
 */
router.post('/', (request, response) => {
  upload(request, response, (error) => {
    if (error) { console.log(error, request.file); }
    console.log(request.file);
  });
});

module.exports = router;
