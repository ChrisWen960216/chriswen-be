const express = require('express');

const router = express.Router();
const AuthCheck = require('../middlewares/authCheck');

const checkLogIn = new AuthCheck().logIn;

// GET /signin 登录页
router.get('/', checkLogIn, (req, res) => {
  res.send('登录页');
});

// POST /signin 用户登录
router.post('/', checkLogIn, (req, res) => {
  res.send('登录');
});

module.exports = router;
