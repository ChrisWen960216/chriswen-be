const express = require('express');

const router = express.Router();
const AuthCheck = require('../middlewares/authCheck');

const checkLogIn = new AuthCheck().logIn;

router.get('/', checkLogIn, (req, res) => {
  res.send('登出');
});


module.exports = router;
