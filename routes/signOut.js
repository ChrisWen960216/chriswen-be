const express = require('express');

const router = express.Router();
// const AuthCheck = require('../middlewares/authCheck');

// const checkLogIn = new AuthCheck().logIn;

const { checkLogin } = require('../middlewares/authCheck');

router.get('/', checkLogin, (req, res) => {
  res.send('登出');
});


module.exports = router;
