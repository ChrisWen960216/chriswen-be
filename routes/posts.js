const express = require('express');

const router = express.Router();
const AuthCheck = require('../middlewares/authCheck');

const checkLogIn = new AuthCheck().logIn;

router.get('/', (request, response) => {
  response.send('主页');
});

// POST /posts/create 发表一篇文章
router.post('/create', checkLogIn, (req, res) => {
  res.send('发表文章');
});

// GET /posts/create 发表文章页
router.get('/create', checkLogIn, (req, res) => {
  res.send('发表文章页');
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', (req, res) => {
  res.send('文章详情页');
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogIn, (req, res) => {
  res.send('更新文章页');
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogIn, (req, res) => {
  res.send('更新文章');
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogIn, (req, res) => {
  res.send('删除文章');
});


module.exports = router;
