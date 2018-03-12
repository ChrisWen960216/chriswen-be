const express = require('express');

const router = express.Router();
const AuthCheck = require('../middlewares/authCheck');

const checkLogIn = new AuthCheck().logIn;

// POST /comments 创建一条留言
router.post('/', checkLogIn, (req, res) => {
  res.send('创建留言');
});

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogIn, (req, res) => {
  res.send('删除留言');
});

module.exports = router;
