const express = require('express');

const router = express.Router();
const { checkLogin } = require('../middlewares/authCheck');


// POST /comments 创建一条留言
router.get('/', checkLogin, (requset, response) => {
  response.send('创建留言');
});

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, (req, res) => {
  res.send('删除留言');
});

module.exports = router;